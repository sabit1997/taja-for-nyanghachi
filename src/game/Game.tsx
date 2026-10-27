import { useCallback, useEffect, useState } from 'react';
import heroSprite from '../assets/icons/grade-3-gold.png';
import { useKeydown } from '../lib/hooks';
import type { Lang } from '../lib/layout';
import { sound } from '../lib/sound';
import { accuracy, cpm } from '../lib/stats';
import { loadGameBest, saveGameBest } from '../lib/storage';
import { Battle, type RunState } from './Battle';
import { MAX_HEARTS, STAGES, clearBonus } from './stages';
import './game.css';

type Phase = 'title' | 'battle' | 'clear' | 'over' | 'ending';

const NEW_RUN: RunState = { hearts: MAX_HEARTS, score: 0, keys: 0, correct: 0, attempts: 0, maxCombo: 0 };

export function Game({ lang, onExit }: { lang: Lang; onExit: () => void }) {
  const [phase, setPhase] = useState<Phase>('title');
  const [stageIndex, setStageIndex] = useState(0);
  const [run, setRun] = useState(NEW_RUN);
  const [startedAt, setStartedAt] = useState(0);
  const [endedAt, setEndedAt] = useState(0);
  const [best, setBest] = useState(() => loadGameBest(lang));
  const [newBest, setNewBest] = useState(false);
  const [lastBonus, setLastBonus] = useState(0);
  // 전투에서 마지막으로 누른 Enter가 다음 화면을 바로 넘기지 않게
  const [armed, setArmed] = useState(true);

  useEffect(() => {
    if (phase === 'title' || phase === 'battle') return;
    setArmed(false);
    const id = setTimeout(() => setArmed(true), 700);
    return () => clearTimeout(id);
  }, [phase]);

  const start = () => {
    sound.select();
    setRun(NEW_RUN);
    setStageIndex(0);
    setStartedAt(Date.now());
    setNewBest(false);
    setPhase('battle');
  };

  const finish = useCallback(
    (final: RunState, phase: 'over' | 'ending') => {
      setRun(final);
      setEndedAt(Date.now());
      if (final.score > best) {
        setBest(final.score);
        setNewBest(true);
        saveGameBest(lang, final.score);
      }
      setPhase(phase);
    },
    [best, lang],
  );

  const onWin = useCallback(
    (result: RunState) => {
      const bonus = clearBonus(result.hearts);
      const withBonus = { ...result, score: result.score + bonus };
      setLastBonus(bonus);
      if (stageIndex === STAGES.length - 1) {
        sound.fanfare();
        finish(withBonus, 'ending');
      } else {
        sound.fanfare();
        // 스테이지를 깨면 하트 1개 회복
        setRun({ ...withBonus, hearts: Math.min(MAX_HEARTS, withBonus.hearts + 1) });
        setPhase('clear');
      }
    },
    [stageIndex, finish],
  );

  const onLose = useCallback((result: RunState) => finish(result, 'over'), [finish]);

  useKeydown((e) => {
    if (e.key === 'Escape') {
      if (phase === 'battle' || phase === 'clear') setPhase('title');
      else onExit();
      return;
    }
    if (e.key !== 'Enter' || !armed) return;
    if (phase === 'title') start();
    else if (phase === 'clear') {
      sound.select();
      setStageIndex((i) => i + 1);
      setPhase('battle');
    } else if (phase === 'over' || phase === 'ending') {
      start();
    }
  });

  const stage = STAGES[stageIndex];
  const elapsed = (endedAt || Date.now()) - startedAt;

  return (
    <div className="game">
      <div className="stars" aria-hidden />
      <div className="game-frame">
        {phase === 'title' && (
          <div className="game-screen title-screen">
            <p className="game-subtitle">냥하치 타자 · 게임 모드</p>
            <h1 className="game-title">냥하치 우주 대모험</h1>
            <div className="title-cast">
              <img className="sprite bob" src={heroSprite} alt="냥하치" />
              <span className="vs">VS</span>
              {STAGES.map((s) => (
                <img key={s.id} className={`sprite cast-enemy ${s.boss ? 'boss' : ''}`} src={s.sprite} alt={s.enemy} />
              ))}
            </div>
            <p className="story">
              외계인이 지구의 생선을 노린다!
              <br />
              낱말을 쳐서 생선을 던져 물리치자.
            </p>
            <p className="press-start blink-text">PRESS ENTER ▶</p>
            <p className="game-best">
              BEST {best.toLocaleString()} · {lang === 'ko' ? '한글' : 'English'}
            </p>
            <button className="pixel-btn" onClick={start}>
              시작하기
            </button>
          </div>
        )}

        {phase === 'battle' && (
          <Battle key={stage.id} lang={lang} stage={stage} run={run} onWin={onWin} onLose={onLose} />
        )}

        {phase === 'clear' && (
          <div className="game-screen">
            <h2 className="game-title">STAGE CLEAR!</h2>
            <p>
              {stage.enemy} 격파! 남은 하트 보너스 <b>+{lastBonus.toLocaleString()}</b>
            </p>
            <p>하트 1개 회복 ♥</p>
            <p className="game-best">SCORE {run.score.toLocaleString()}</p>
            <p className="press-start blink-text">NEXT: {STAGES[stageIndex + 1]?.enemy} · PRESS ENTER ▶</p>
          </div>
        )}

        {(phase === 'over' || phase === 'ending') && (
          <div className="game-screen">
            <h2 className={`game-title ${phase === 'over' ? 'lose' : ''}`}>
              {phase === 'over' ? 'GAME OVER' : '지구를 지켰다!'}
            </h2>
            {phase === 'ending' && <img className="sprite bob" src={heroSprite} alt="" />}
            <dl className="final-stats">
              <dt>SCORE</dt>
              <dd>{run.score.toLocaleString()}</dd>
              <dt>타수</dt>
              <dd>{cpm(run.keys, elapsed)}</dd>
              <dt>정확도</dt>
              <dd>{accuracy(run.correct, run.attempts)}%</dd>
              <dt>최대 콤보</dt>
              <dd>{run.maxCombo}</dd>
            </dl>
            {newBest && <p className="new-best blink-text">★ NEW BEST ★</p>}
            <p className="press-start">Enter 다시 하기 · ESC 메뉴로</p>
          </div>
        )}
      </div>
    </div>
  );
}
