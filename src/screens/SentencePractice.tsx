import { useMemo } from 'react';
import { DosWindow } from '../components/DosWindow';
import { TypedLine } from '../components/TypedLine';
import { SENTENCES, pickRandom } from '../data/texts';
import { bar } from '../lib/format';
import { useKeydown } from '../lib/hooks';
import type { Lang } from '../lib/layout';
import { useTypingSession, type SessionSummary } from '../lib/useTypingSession';
import { LangHint } from './LangHint';

const LENGTH = 5;

interface Props {
  lang: Lang;
  onExit: () => void;
  onDone: (summary: SessionSummary) => void;
}

export function SentencePractice({ lang, onExit, onDone }: Props) {
  const sentences = useMemo(() => pickRandom(SENTENCES[lang], LENGTH), [lang]);
  const session = useTypingSession({
    items: sentences,
    canSubmit: (target, typed) => typed.length >= target.length,
    onDone,
  });
  const { index, target, input, result, liveCpm, liveAccuracy } = session;

  useKeydown((e) => {
    if (e.key === 'Escape') onExit();
    if (e.key === 'Tab') e.preventDefault();
  });

  if (session.finished) return null;

  const ready = input.value.length >= target.length && !input.composing;

  return (
    <DosWindow
      title="짧은 글 연습"
      right={
        <>
          타수 <b>{liveCpm}</b>
        </>
      }
    >
      <div className="practice" onClick={input.focus}>
        <p className="dim">
          {index + 1} / {sentences.length}
        </p>
        <TypedLine target={target} typed={input.value} composing={input.composing} result={result} />
        <div className="line-preview">
          {sentences.slice(index + 1, index + 3).map((s, i) => (
            <div key={i}>{s}</div>
          ))}
        </div>
        <LangHint lang={lang} typed={input.value} />
        <p className={`center ${ready ? 'blink-text' : 'dim'}`}>
          {ready ? 'Enter ↵ 를 눌러 다음 줄로' : '끝까지 입력한 뒤 Enter ↵'}
        </p>
        <div className="stats-row">
          <span>정확도 {liveAccuracy}%</span>
          <span>진행 {bar(index / sentences.length, 20)}</span>
        </div>
        <input {...input.props} />
      </div>
    </DosWindow>
  );
}
