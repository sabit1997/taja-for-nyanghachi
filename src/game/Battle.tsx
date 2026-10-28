import { useEffect, useMemo, useRef, useState } from 'react';
import fishSprite from '../assets/icons/deco-fish.png';
import heroSprite from '../assets/icons/grade-3-gold.png';
import heartSprite from '../assets/icons/deco-heart.png';
import { countKeystrokes } from '../lib/hangul';
import { useImeInput } from '../lib/hooks';
import type { Lang } from '../lib/layout';
import { sound } from '../lib/sound';
import { compareLine } from '../lib/stats';
import { MAX_HEARTS, WRONG_PENALTY, chargeAfterHit, damageFor, type StageDef } from './stages';

export interface RunState {
  hearts: number;
  score: number;
  /** 맞힌 글자들의 타수 합 (분당 타수 계산용) */
  keys: number;
  correct: number;
  attempts: number;
  maxCombo: number;
}

interface Props {
  lang: Lang;
  stage: StageDef;
  run: RunState;
  onWin: (run: RunState) => void;
  onLose: (run: RunState) => void;
}

const TICK_MS = 50;
const SILENT_KEYS = new Set(['Shift', 'Control', 'Alt', 'Meta', 'CapsLock', 'Enter', 'Escape', 'Tab', 'HangulMode', 'Lang1']);

interface Hit {
  id: number;
  damage: number;
}

export function Battle({ lang, stage, run: initialRun, onWin, onLose }: Props) {
  const targets = useMemo(() => stage.targets(lang), [stage, lang]);
  const [turn, setTurn] = useState(0);
  const [run, setRun] = useState(initialRun);
  const [enemyHp, setEnemyHp] = useState(stage.hp);
  const [charge, setCharge] = useState(0);
  const [combo, setCombo] = useState(0);
  const [hit, setHit] = useState<Hit | null>(null);
  const [hurtId, setHurtId] = useState(0);
  const [over, setOver] = useState(false);
  const target = targets[turn % targets.length];
  const hasSpace = target.includes(' ');

  const runRef = useRef(run);
  runRef.current = run;

  const submit = (raw: string) => {
    if (over) return;
    const typed = raw.trim();
    if (!typed) return;
    input.clear();

    if (typed !== target) {
      sound.error();
      setCombo(0);
      setCharge((c) => Math.min(1, c + WRONG_PENALTY));
      setRun((r) => ({ ...r, attempts: r.attempts + 1 }));
      return;
    }

    const damage = damageFor(target, combo);
    const nextCombo = combo + 1;
    const nextHp = Math.max(0, enemyHp - damage);
    const nextRun: RunState = {
      ...run,
      score: run.score + damage * 10,
      keys: run.keys + countKeystrokes(target),
      correct: run.correct + 1,
      attempts: run.attempts + 1,
      maxCombo: Math.max(run.maxCombo, nextCombo),
    };
    sound.hit();
    setHit({ id: Date.now(), damage });
    setCombo(nextCombo);
    setEnemyHp(nextHp);
    setCharge((c) => chargeAfterHit(c, target));
    setRun(nextRun);
    setTurn((t) => t + 1);
    if (nextHp === 0) {
      setOver(true);
      setTimeout(() => onWin(nextRun), 900);
    }
  };

  const input = useImeInput({
    onSubmit: submit,
    onKey: (e) => {
      if (!SILENT_KEYS.has(e.key)) sound.key();
    },
  });
  const { value, composing } = input;

  // 낱말은 Space로도 공격 (문장은 띄어쓰기가 있으니 Enter만)
  useEffect(() => {
    if (!hasSpace && value.endsWith(' ')) submit(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  // 적 공격 게이지
  useEffect(() => {
    if (over) return;
    const id = setInterval(() => setCharge((c) => c + TICK_MS / stage.attackMs), TICK_MS);
    return () => clearInterval(id);
  }, [over, stage.attackMs]);

  useEffect(() => {
    if (charge < 1 || over) return;
    setCharge(0);
    setCombo(0);
    setHurtId((n) => n + 1);
    const hearts = runRef.current.hearts - 1;
    const nextRun = { ...runRef.current, hearts };
    setRun(nextRun);
    if (hearts <= 0) {
      sound.gameOver();
      setOver(true);
      setTimeout(() => onLose(nextRun), 900);
    } else {
      sound.hurt();
    }
  }, [charge, over, onLose]);

  const result = compareLine(target, value, composing);
  const enemyDead = enemyHp === 0;

  return (
    <div className={`battle ${hurtId ? `hurt-${hurtId % 2}` : ''}`} onClick={input.focus}>
      <header className="hud">
        <span className="hud-stage">{stage.label}</span>
        <span>
          SCORE <b>{run.score.toLocaleString()}</b>
        </span>
      </header>

      <div className="arena">
        <div className="fighter hero">
          <div className="hearts">
            {Array.from({ length: MAX_HEARTS }, (_, i) => (
              <img key={i} src={heartSprite} alt="" className={i < run.hearts ? undefined : 'empty'} />
            ))}
          </div>
          <img key={`hero-${hurtId}`} className={`sprite hero-sprite ${hurtId ? 'flinch' : ''}`} src={heroSprite} alt="냥하치" />
          <div className="fighter-name">냥하치</div>
        </div>

        {hit && <img key={hit.id} className="projectile" src={fishSprite} alt="" />}

        <div className="fighter enemy">
          <div className="fighter-name">
            {stage.boss && <span className="boss-tag">BOSS</span>} {stage.enemy}
          </div>
          <div className="bar hp-bar">
            <div style={{ width: `${(enemyHp / stage.hp) * 100}%` }} />
            <span>
              HP {enemyHp}/{stage.hp}
            </span>
          </div>
          <div className="bar charge-bar" title="공격 게이지">
            <div style={{ width: `${Math.min(1, charge) * 100}%` }} />
            <span>{charge > 0.75 ? '!! 공격 임박 !!' : '공격 게이지'}</span>
          </div>
          <div className="sprite-wrap">
            <img
              key={hit?.id ?? 'enemy'}
              className={`sprite enemy-sprite ${stage.boss ? 'boss' : ''} ${hit ? 'shake' : ''} ${enemyDead ? 'dead' : ''}`}
              src={stage.sprite}
              alt={stage.enemy}
            />
            {hit && (
              <span key={`dmg-${hit.id}`} className="damage">
                -{hit.damage}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="speech">
        <div className="speech-target">
          {[...target].map((ch, i) => (
            <span key={i} className={`ch-${result.states[i]}`}>
              {ch}
            </span>
          ))}
        </div>
      </div>

      <div className="command">
        <span className="prompt">&gt;</span>
        <span className="command-typed">
          {[...value].map((ch, i) => (
            <span key={i} className={i < target.length ? `ch-${result.states[i]}` : 'ch-bad'}>
              {ch}
            </span>
          ))}
          <span className="cursor">█</span>
        </span>
        <span className={`combo ${combo >= 5 ? 'hot' : ''}`}>{combo > 1 && `COMBO x${combo}`}</span>
      </div>
      <p className="battle-help">{hasSpace ? 'Enter ↵ 로 공격' : 'Space 또는 Enter ↵ 로 공격'} · ESC 나가기</p>
      <input {...input.props} />
    </div>
  );
}
