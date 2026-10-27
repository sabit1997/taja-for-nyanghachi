import { useEffect, useMemo, useState } from 'react';
import { DosWindow } from '../components/DosWindow';
import { Keyboard } from '../components/Keyboard';
import { bar } from '../lib/format';
import { useKeydown, useNow } from '../lib/hooks';
import { STAGES, fingerFor, isCorrectPress, makeSequence, shiftSideFor, type Lang, type Stage } from '../lib/layout';
import { sound } from '../lib/sound';
import { accuracy, cpm } from '../lib/stats';
import type { SessionSummary } from '../lib/useTypingSession';

const LENGTH = 40;
const MODIFIERS = new Set(['Shift', 'Control', 'Alt', 'Meta', 'CapsLock', 'Tab', 'HangulMode', 'Lang1']);

interface Props {
  lang: Lang;
  /** 결과 화면에서 '다시 하기'로 들어오면 같은 단계로 바로 시작 */
  initialStageId?: string;
  onExit: () => void;
  onDone: (summary: SessionSummary, stage: Stage) => void;
}

export function KeyPractice({ lang, initialStageId, onExit, onDone }: Props) {
  const [stage, setStage] = useState<Stage | null>(() => STAGES.find((s) => s.id === initialStageId) ?? null);
  return stage ? (
    <KeyDrill key={stage.id} lang={lang} stage={stage} onExit={() => setStage(null)} onDone={(s) => onDone(s, stage)} />
  ) : (
    <StageSelect onSelect={setStage} onExit={onExit} />
  );
}

function StageSelect({ onSelect, onExit }: { onSelect: (s: Stage) => void; onExit: () => void }) {
  const [cursor, setCursor] = useState(0);

  useKeydown((e) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      sound.move();
      setCursor((c) => (c + (e.key === 'ArrowUp' ? -1 : 1) + STAGES.length) % STAGES.length);
    } else if (e.key === 'Enter') {
      sound.select();
      onSelect(STAGES[cursor]);
    } else if (/^[1-4]$/.test(e.key)) {
      sound.select();
      onSelect(STAGES[Number(e.key) - 1]);
    } else if (e.key === 'Escape') {
      onExit();
    }
  });

  return (
    <DosWindow title="자리 연습" width="narrow">
      <p>연습할 단계를 고르세요.</p>
      <ul className="menu">
        {STAGES.map((s, i) => (
          <li
            key={s.id}
            className={i === cursor ? 'selected' : undefined}
            onMouseEnter={() => setCursor(i)}
            onClick={() => onSelect(s)}
          >
            <span className="menu-arrow">{i === cursor ? '▶' : ' '}</span>
            {s.name}
          </li>
        ))}
      </ul>
    </DosWindow>
  );
}

function KeyDrill({ lang, stage, onExit, onDone }: { lang: Lang; stage: Stage; onExit: () => void; onDone: (s: SessionSummary) => void }) {
  const sequence = useMemo(() => makeSequence(stage.targets(lang), LENGTH), [stage, lang]);
  const [index, setIndex] = useState(0);
  const [presses, setPresses] = useState(0);
  const [wrongCode, setWrongCode] = useState<string | null>(null);
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const target = sequence[index];
  const finished = index >= sequence.length;

  useEffect(() => {
    if (!wrongCode) return;
    const id = setTimeout(() => setWrongCode(null), 250);
    return () => clearTimeout(id);
  }, [wrongCode]);

  useKeydown((e) => {
    if (e.key === 'Escape') return onExit();
    if (finished || e.repeat || MODIFIERS.has(e.key) || e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.key.startsWith('F') && e.key.length > 1) return;
    e.preventDefault();
    const start = startedAt ?? Date.now();
    if (startedAt === null) setStartedAt(start);
    setPresses((p) => p + 1);

    if (!isCorrectPress(target, e.code, e.shiftKey, lang)) {
      sound.error();
      setWrongCode(e.code);
      return;
    }
    sound.key();
    setWrongCode(null);
    const next = index + 1;
    setIndex(next);
    if (next >= sequence.length) {
      const durationMs = Date.now() - start;
      sound.fanfare();
      onDone({ cpm: cpm(sequence.length, durationMs), accuracy: accuracy(sequence.length, presses + 1), durationMs });
    }
  });

  const now = useNow(startedAt !== null && !finished);
  const elapsed = startedAt === null ? 0 : now - startedAt;

  if (finished) return null;

  return (
    <DosWindow
      title={`자리 연습 · ${stage.name}`}
      right={
        <>
          타수 <b>{cpm(index, elapsed)}</b>
        </>
      }
    >
      <div className="drill">
        <div className="drill-queue">
          <span className="drill-current">{target.label}</span>
          {sequence.slice(index + 1, index + 10).map((t, i) => (
            <span key={i} className="drill-next">
              {t.label}
            </span>
          ))}
        </div>
        <p className="finger">
          {fingerFor(target)}
          {lang === 'ko' && <span className="dim"> · 한/영 상태와 관계없이 키 위치로 판정해요</span>}
        </p>
        <Keyboard lang={lang} targetCode={target.key.code} shiftSide={shiftSideFor(target)} wrongCode={wrongCode} />
        <div className="stats-row">
          <span>정확도 {accuracy(index, presses)}%</span>
          <span>
            진행 {bar(index / sequence.length, 20)} {index}/{sequence.length}
          </span>
        </div>
      </div>
    </DosWindow>
  );
}
