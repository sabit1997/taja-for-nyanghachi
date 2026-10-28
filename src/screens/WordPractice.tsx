import { useMemo } from 'react';
import { DosWindow } from '../components/DosWindow';
import { TypedLine } from '../components/TypedLine';
import { WORDS, pickRandom } from '../data/texts';
import { bar } from '../lib/format';
import { useKeydown } from '../lib/hooks';
import type { Lang } from '../lib/layout';
import { useTypingSession, type SessionSummary } from '../lib/useTypingSession';
import { LangHint } from './LangHint';

const LENGTH = 20;

interface Props {
  lang: Lang;
  onExit: () => void;
  onDone: (summary: SessionSummary) => void;
}

export function WordPractice({ lang, onExit, onDone }: Props) {
  const words = useMemo(() => pickRandom(WORDS[lang], LENGTH), [lang]);
  const session = useTypingSession({
    items: words,
    submitOnSpace: true,
    canSubmit: (_, typed) => typed.length > 0,
    onDone,
  });
  const { index, target, history, input, result, liveCpm, liveAccuracy } = session;

  useKeydown((e) => {
    if (e.key === 'Escape') onExit();
    if (e.key === 'Tab') e.preventDefault();
  });

  if (session.finished) return null;

  return (
    <DosWindow
      title="낱말 연습"
      right={
        <>
          타수 <b>{liveCpm}</b>
        </>
      }
    >
      <div className="practice" onClick={input.focus}>
        <div className="word-history">
          {words.slice(Math.max(0, index - 6), index).map((w, i) => {
            const at = Math.max(0, index - 6) + i;
            return (
              <span key={at} className={history[at] ? 'ch-ok' : 'ch-bad'}>
                {w}
              </span>
            );
          })}
        </div>
        <div className="word-box">
          <TypedLine target={target} typed={input.value} composing={input.composing} result={result} />
        </div>
        <div className="word-next">
          {words.slice(index + 1, index + 6).map((w, i) => (
            <span key={i}>{w}</span>
          ))}
        </div>
        <LangHint lang={lang} typed={input.value} />
        <p className="dim center">Space 또는 Enter ↵ 로 다음 낱말</p>
        <div className="stats-row">
          <span>정확도 {liveAccuracy}%</span>
          <span>
            진행 {bar(index / words.length, 20)} {index}/{words.length}
          </span>
        </div>
        <input {...input.props} />
      </div>
    </DosWindow>
  );
}
