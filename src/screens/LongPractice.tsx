import { useMemo, useState } from 'react';
import { DosWindow } from '../components/DosWindow';
import { TypedLine } from '../components/TypedLine';
import { LINE_WIDTH, LONG_TEXTS, toLines, type LongText } from '../data/longTexts';
import { bar } from '../lib/format';
import { useKeydown } from '../lib/hooks';
import type { Lang } from '../lib/layout';
import { sound } from '../lib/sound';
import { useTypingSession, type SessionSummary } from '../lib/useTypingSession';
import { LangHint } from './LangHint';

interface Props {
  lang: Lang;
  /** 결과 화면에서 '다시 하기'로 들어오면 같은 글로 바로 시작 */
  initialTextId?: string;
  onExit: () => void;
  onDone: (summary: SessionSummary, text: LongText) => void;
}

export function LongPractice({ lang, initialTextId, onExit, onDone }: Props) {
  const [text, setText] = useState<LongText | null>(() => LONG_TEXTS[lang].find((t) => t.id === initialTextId) ?? null);
  return text ? (
    <LongTyping key={text.id} lang={lang} text={text} onExit={() => setText(null)} onDone={(s) => onDone(s, text)} />
  ) : (
    <TextSelect lang={lang} onSelect={setText} onExit={onExit} />
  );
}

function TextSelect({ lang, onSelect, onExit }: { lang: Lang; onSelect: (t: LongText) => void; onExit: () => void }) {
  const texts = LONG_TEXTS[lang];
  const [cursor, setCursor] = useState(0);

  const choose = (i: number) => {
    sound.select();
    onSelect(texts[i]);
  };

  useKeydown((e) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      sound.move();
      setCursor((c) => (c + (e.key === 'ArrowUp' ? -1 : 1) + texts.length) % texts.length);
    } else if (e.key === 'Enter') {
      choose(cursor);
    } else if (/^[1-9]$/.test(e.key) && Number(e.key) <= texts.length) {
      // 다음 화면 입력창에 숫자가 들어가지 않게
      e.preventDefault();
      choose(Number(e.key) - 1);
    } else if (e.key === 'Escape') {
      onExit();
    }
  });

  return (
    <DosWindow title="긴 글 연습">
      <p>연습할 글을 고르세요.</p>
      <ul className="menu text-list">
        {texts.map((t, i) => (
          <li
            key={t.id}
            className={i === cursor ? 'selected' : undefined}
            onMouseEnter={() => setCursor(i)}
            onClick={() => choose(i)}
          >
            <span className="menu-arrow">{i === cursor ? '▶' : ' '}</span>
            <span className="text-title">
              {i + 1}. {t.title}
            </span>
            <span className="text-meta">
              {t.author} · {toLines(t.body, LINE_WIDTH[lang]).length}줄
            </span>
          </li>
        ))}
      </ul>
    </DosWindow>
  );
}

function LongTyping({ lang, text, onExit, onDone }: { lang: Lang; text: LongText; onExit: () => void; onDone: (s: SessionSummary) => void }) {
  const lines = useMemo(() => toLines(text.body, LINE_WIDTH[lang]), [text, lang]);
  const session = useTypingSession({
    items: lines,
    canSubmit: (target, typed) => typed.length >= target.length,
    onDone,
  });
  const { index, target, history, input, result, liveCpm, liveAccuracy } = session;

  useKeydown((e) => {
    if (e.key === 'Escape') onExit();
    if (e.key === 'Tab') e.preventDefault();
  });

  if (session.finished) return null;

  const ready = input.value.length >= target.length && !input.composing;
  const doneStart = Math.max(0, index - 2);

  return (
    <DosWindow
      title={`긴 글 연습 · ${text.title}`}
      right={
        <>
          타수 <b>{liveCpm}</b>
        </>
      }
    >
      <div className="practice long" onClick={input.focus}>
        <p className="dim">
          {text.author} · {index + 1} / {lines.length}줄
        </p>
        <div className="long-done">
          {lines.slice(doneStart, index).map((line, i) => (
            <div key={doneStart + i} className={history[doneStart + i] ? undefined : 'long-missed'}>
              {line}
            </div>
          ))}
        </div>
        <TypedLine target={target} typed={input.value} composing={input.composing} result={result} />
        <div className="line-preview">
          {lines.slice(index + 1, index + 4).map((line, i) => (
            <div key={i}>{line}</div>
          ))}
        </div>
        <LangHint lang={lang} typed={input.value} />
        <p className={`center ${ready ? 'blink-text' : 'dim'}`}>
          {ready ? 'Enter ↵ 를 눌러 다음 줄로' : '끝까지 입력한 뒤 Enter ↵'}
        </p>
        <div className="stats-row">
          <span>정확도 {liveAccuracy}%</span>
          <span>
            진행 {bar(index / lines.length, 20)} {Math.round((index / lines.length) * 100)}%
          </span>
        </div>
        <input {...input.props} />
      </div>
    </DosWindow>
  );
}
