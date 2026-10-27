import { useEffect, useRef, useState } from 'react';
import { useImeInput, useNow } from './hooks';
import { sound } from './sound';
import { accuracy, compareLine, cpm } from './stats';

export interface SessionSummary {
  cpm: number;
  accuracy: number;
  durationMs: number;
}

interface Options {
  items: string[];
  /** 낱말 연습처럼 Space로 다음으로 넘어가는 모드 */
  submitOnSpace?: boolean;
  /** Enter로 넘어가기 위한 최소 조건 */
  canSubmit: (target: string, typed: string) => boolean;
  onDone: (summary: SessionSummary) => void;
}

const SILENT_KEYS = new Set(['Shift', 'Control', 'Alt', 'Meta', 'CapsLock', 'Enter', 'Escape', 'Tab', 'HangulMode', 'Lang1']);

/** 낱말/짧은 글 연습 공통: 줄 단위 입력, 실시간 타수·정확도, 세션 집계 */
export function useTypingSession({ items, submitOnSpace = false, canSubmit, onDone }: Options) {
  const [index, setIndex] = useState(0);
  const [done, setDone] = useState({ keys: 0, correct: 0, total: 0 });
  const [history, setHistory] = useState<boolean[]>([]);
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const target = items[index] ?? '';
  const finished = index >= items.length;

  const submit = (raw: string) => {
    if (finished) return;
    const typed = submitOnSpace ? raw.trimEnd() : raw;
    if (!canSubmit(target, typed)) return;
    const r = compareLine(target, typed, false);
    const exact = typed === target;
    if (!exact) sound.error();
    const next = {
      keys: done.keys + r.correctKeys,
      correct: done.correct + r.correctChars,
      total: done.total + Math.max(target.length, typed.length),
    };
    setDone(next);
    setHistory((h) => [...h, exact]);
    input.clear();
    setIndex(index + 1);
    if (index + 1 >= items.length) {
      const durationMs = Date.now() - (startedAt ?? Date.now());
      sound.fanfare();
      onDone({ cpm: cpm(next.keys, durationMs), accuracy: accuracy(next.correct, next.total), durationMs });
    }
  };

  const input = useImeInput({
    onSubmit: submit,
    onKey: (e) => {
      if (!SILENT_KEYS.has(e.key)) sound.key();
    },
  });

  const { value, composing } = input;
  const result = compareLine(target, value, composing);

  // 첫 입력 시점부터 시간을 잰다
  useEffect(() => {
    if (value && startedAt === null) setStartedAt(Date.now());
  }, [value, startedAt]);

  // 낱말 연습: Space가 들어오면 다음 낱말로
  useEffect(() => {
    if (!submitOnSpace || !value.endsWith(' ')) return;
    if (value.trim() === '') input.clear();
    else submit(value);
    // submit은 매 렌더 새로 만들어지므로 value 변화에만 반응한다
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, submitOnSpace]);

  // 새로 확정된 글자가 틀렸을 때만 경고음
  const wrongRef = useRef(0);
  const wrong = result.judged - result.correctChars;
  useEffect(() => {
    if (wrong > wrongRef.current) sound.error();
    wrongRef.current = wrong;
  }, [wrong]);
  useEffect(() => {
    wrongRef.current = 0;
  }, [index]);

  const now = useNow(startedAt !== null && !finished);
  const elapsed = startedAt === null ? 0 : now - startedAt;
  const liveCpm = cpm(done.keys + result.correctKeys, elapsed);
  const liveAccuracy = accuracy(done.correct + result.correctChars, done.total + result.judged);

  return { index, target, finished, history, input, result, liveCpm, liveAccuracy };
}
