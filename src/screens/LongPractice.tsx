import { useMemo, useState } from 'react';
import { DosWindow } from '../components/DosWindow';
import { TypedLine } from '../components/TypedLine';
import { LINE_WIDTH, LONG_TEXTS, groupWorks, toLines, type LongText, type Work } from '../data/longTexts';
import { bar } from '../lib/format';
import { useKeydown } from '../lib/hooks';
import type { Lang } from '../lib/layout';
import { sound } from '../lib/sound';
import { loadRecords } from '../lib/storage';
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
  const works = useMemo(() => groupWorks(LONG_TEXTS[lang]), [lang]);
  const [text, setText] = useState<LongText | null>(() => LONG_TEXTS[lang].find((t) => t.id === initialTextId) ?? null);
  // 여러 편으로 나뉜 작품을 고르면 몇 편째를 칠지 한 번 더 고른다
  const [work, setWork] = useState<Work | null>(() => works.find((w) => w.parts.length > 1 && w.parts.some((p) => p.id === initialTextId)) ?? null);

  // 편마다 최고 타수 (기록에는 글 제목이 detail로 남는다)
  const bests = useMemo(() => {
    const map = new Map<string, number>();
    for (const r of loadRecords()) {
      if (r.mode !== 'long' || r.lang !== lang || !r.detail) continue;
      map.set(r.detail, Math.max(map.get(r.detail) ?? 0, r.cpm));
    }
    return map;
  }, [lang]);

  if (text) {
    return <LongTyping key={text.id} lang={lang} text={text} onExit={() => setText(null)} onDone={(s) => onDone(s, text)} />;
  }

  if (work) {
    return (
      <Picker
        title={`긴 글 연습 · ${work.title}`}
        prompt={`${work.author} · 몇 번째 편을 칠까요?`}
        items={work.parts.map((part) => {
          const best = bests.get(part.title);
          return {
            key: part.id,
            label: `${toLines(part.body, LINE_WIDTH[lang])[0]}...`,
            meta: `${toLines(part.body, LINE_WIDTH[lang]).length}줄${best ? ` · 최고 ${best}타` : ''}`,
            done: best !== undefined,
          };
        })}
        onPick={(i) => setText(work.parts[i])}
        onBack={() => setWork(null)}
      />
    );
  }

  return (
    <Picker
      title="긴 글 연습"
      prompt="연습할 글을 고르세요."
      items={works.map((w) => {
        const done = w.parts.filter((p) => bests.has(p.title)).length;
        const meta =
          w.parts.length > 1
            ? `${w.author} · ${w.parts.length}편${done ? ` · ${done}편 완료` : ''}`
            : `${w.author} · ${toLines(w.parts[0].body, LINE_WIDTH[lang]).length}줄`;
        return { key: w.key, label: w.title, meta, done: done === w.parts.length };
      })}
      onPick={(i) => (works[i].parts.length > 1 ? setWork(works[i]) : setText(works[i].parts[0]))}
      onBack={onExit}
    />
  );
}

interface PickerItem {
  key: string;
  label: string;
  meta: string;
  done: boolean;
}

function Picker({ title, prompt, items, onPick, onBack }: { title: string; prompt: string; items: PickerItem[]; onPick: (i: number) => void; onBack: () => void }) {
  const [cursor, setCursor] = useState(0);

  const choose = (i: number) => {
    sound.select();
    onPick(i);
  };

  useKeydown((e) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      sound.move();
      setCursor((c) => (c + (e.key === 'ArrowUp' ? -1 : 1) + items.length) % items.length);
    } else if (e.key === 'Enter') {
      choose(cursor);
    } else if (/^[1-9]$/.test(e.key) && Number(e.key) <= items.length) {
      // 다음 화면 입력창에 숫자가 들어가지 않게
      e.preventDefault();
      choose(Number(e.key) - 1);
    } else if (e.key === 'Escape') {
      onBack();
    }
  });

  return (
    <DosWindow title={title}>
      <p>{prompt}</p>
      <ul className="menu text-list">
        {items.map((item, i) => (
          <li
            key={item.key}
            className={i === cursor ? 'selected' : undefined}
            onMouseEnter={() => setCursor(i)}
            onClick={() => choose(i)}
          >
            <span className="menu-arrow">{i === cursor ? '▶' : ' '}</span>
            <span className="text-title">
              {i + 1}. {item.label}
            </span>
            <span className="text-meta">
              {item.done && <span className="text-done">✓ </span>}
              {item.meta}
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
