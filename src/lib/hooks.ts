import { useCallback, useEffect, useRef, useState } from 'react';
import type { ChangeEvent, CompositionEvent, KeyboardEvent as ReactKeyboardEvent } from 'react';

/** window keydown 구독. handler는 항상 최신 값을 쓴다. */
export function useKeydown(handler: (e: KeyboardEvent) => void, active = true) {
  const ref = useRef(handler);
  ref.current = handler;
  useEffect(() => {
    if (!active) return;
    const listener = (e: KeyboardEvent) => ref.current(e);
    window.addEventListener('keydown', listener);
    return () => window.removeEventListener('keydown', listener);
  }, [active]);
}

/** running 동안 주기적으로 현재 시각을 갱신한다 (실시간 타수 표시용) */
export function useNow(running: boolean, intervalMs = 250): number {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setNow(Date.now()), intervalMs);
    return () => clearInterval(id);
  }, [running, intervalMs]);
  return now;
}

interface ImeInputOptions {
  onSubmit: (value: string) => void;
  onKey?: (e: ReactKeyboardEvent<HTMLInputElement>) => void;
}

/**
 * 한글 IME 조합을 고려한 숨은 입력창.
 * - 조합 중 여부(composing)를 함께 돌려준다.
 * - 조합 중에 Enter를 누르면 조합이 끝난 뒤 제출한다 (브라우저마다 Enter 이벤트 순서가 달라서).
 */
export function useImeInput({ onSubmit, onKey }: ImeInputOptions) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState('');
  const [composing, setComposing] = useState(false);
  const composingRef = useRef(false);
  const pendingSubmit = useRef(false);
  const submitRef = useRef(onSubmit);
  submitRef.current = onSubmit;
  const keyRef = useRef(onKey);
  keyRef.current = onKey;

  const clear = useCallback(() => {
    setValue('');
    if (inputRef.current) inputRef.current.value = '';
  }, []);

  const submitLater = useCallback(() => {
    setTimeout(() => submitRef.current(inputRef.current?.value ?? ''), 0);
  }, []);

  const props = {
    ref: inputRef,
    value,
    autoFocus: true,
    autoComplete: 'off',
    autoCorrect: 'off',
    autoCapitalize: 'off',
    spellCheck: false,
    className: 'hidden-input',
    'aria-label': '타자 입력',
    onChange: (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value),
    onCompositionStart: () => {
      composingRef.current = true;
      setComposing(true);
    },
    onCompositionEnd: (e: CompositionEvent<HTMLInputElement>) => {
      composingRef.current = false;
      setComposing(false);
      setValue(e.currentTarget.value);
      if (pendingSubmit.current) {
        pendingSubmit.current = false;
        submitLater();
      }
    },
    onKeyDown: (e: ReactKeyboardEvent<HTMLInputElement>) => {
      keyRef.current?.(e);
      if (e.key !== 'Enter') return;
      e.preventDefault();
      if (e.nativeEvent.isComposing || composingRef.current) {
        pendingSubmit.current = true;
      } else {
        submitLater();
      }
    },
    onBlur: () => {
      // 클릭 등으로 포커스를 잃어도 바로 다시 입력할 수 있게
      setTimeout(() => inputRef.current?.focus(), 0);
    },
  };

  return { props, value, composing, clear, focus: () => inputRef.current?.focus() };
}
