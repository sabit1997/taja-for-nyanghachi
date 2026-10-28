import alienSprite from '../assets/icons/deco-alien.png';
import cometSprite from '../assets/icons/deco-comet.png';
import moonSprite from '../assets/icons/deco-moon.png';
import ufoSprite from '../assets/icons/deco-ufo.png';
import bossSprite from '../assets/icons/grade-6-master.png';
import { SENTENCES, WORDS, pickRandom } from '../data/texts';
import { countKeystrokes } from '../lib/hangul';
import type { Lang } from '../lib/layout';

export interface StageDef {
  id: string;
  label: string;
  enemy: string;
  sprite: string;
  /** 같은 그림을 다른 색 적으로 쓰기 위한 CSS filter */
  tint?: string;
  boss?: 'mid' | 'final';
  hp: number;
  /** 적의 공격 게이지가 가득 차는 데 걸리는 시간 (보통 난이도 기준) */
  attackMs: number;
  targets: (lang: Lang) => string[];
}

const shortWords = (lang: Lang) => WORDS[lang].filter((w) => w.length <= (lang === 'ko' ? 3 : 5));
const longWords = (lang: Lang) => WORDS[lang].filter((w) => w.length >= (lang === 'ko' ? 3 : 6));
const shortSentences = (lang: Lang) => SENTENCES[lang].filter((s) => s.length <= (lang === 'ko' ? 14 : 32));

export const STAGES: StageDef[] = [
  {
    id: '1-1',
    label: 'STAGE 1-1',
    enemy: '꼬마 UFO',
    sprite: ufoSprite,
    hp: 50,
    attackMs: 5500,
    targets: (lang) => pickRandom(shortWords(lang), 40),
  },
  {
    id: '1-2',
    label: 'STAGE 1-2',
    enemy: '초록 외계인',
    sprite: alienSprite,
    hp: 80,
    attackMs: 5000,
    targets: (lang) => pickRandom(WORDS[lang], 60),
  },
  {
    id: '1-3',
    label: 'STAGE 1-3',
    enemy: '거대 달 요새',
    sprite: moonSprite,
    boss: 'mid',
    hp: 150,
    attackMs: 8000,
    targets: (lang) => pickRandom(shortSentences(lang), 20),
  },
  {
    id: '2-1',
    label: 'STAGE 2-1',
    enemy: '별똥별',
    sprite: cometSprite,
    hp: 100,
    attackMs: 4800,
    targets: (lang) => pickRandom(WORDS[lang], 60),
  },
  {
    id: '2-2',
    label: 'STAGE 2-2',
    enemy: '보라 외계인',
    sprite: alienSprite,
    tint: 'hue-rotate(150deg) saturate(1.4)',
    hp: 130,
    attackMs: 5200,
    targets: (lang) => pickRandom(longWords(lang), 60),
  },
  {
    id: '2-3',
    label: 'STAGE 2-3',
    enemy: '마스터 UFO',
    sprite: bossSprite,
    boss: 'final',
    hp: 260,
    attackMs: 7500,
    targets: (lang) => pickRandom(SENTENCES[lang], 30),
  },
];

export type DifficultyId = 'easy' | 'normal' | 'hard';

export interface Difficulty {
  id: DifficultyId;
  name: string;
  desc: string;
  hpScale: number;
  /** 공격 주기 배율 — 클수록 적이 느리다 */
  attackScale: number;
  wrongPenalty: number;
}

export const DIFFICULTIES: Difficulty[] = [
  { id: 'easy', name: '쉬움', desc: '적이 느리고 약해요', hpScale: 0.7, attackScale: 1.4, wrongPenalty: 0.2 },
  { id: 'normal', name: '보통', desc: '300타면 엔딩을 볼 수 있어요', hpScale: 1, attackScale: 1, wrongPenalty: 0.3 },
  { id: 'hard', name: '어려움', desc: '400타 이상 고수용, 오타에 엄격', hpScale: 1.2, attackScale: 0.85, wrongPenalty: 0.4 },
];

export function difficultyById(id: string): Difficulty {
  return DIFFICULTIES.find((d) => d.id === id) ?? DIFFICULTIES[1];
}

/** 난이도를 반영한 스테이지 */
export function scaleStage(stage: StageDef, difficulty: Difficulty): StageDef {
  return {
    ...stage,
    hp: Math.round(stage.hp * difficulty.hpScale),
    attackMs: Math.round(stage.attackMs * difficulty.attackScale),
  };
}

export const MAX_HEARTS = 5;
/** 맞힌 타수 1타당 적 공격 게이지를 밀어내는 양 */
export const RELIEF_PER_KEY = 0.045;

/** 콤보 10까지 10%씩 보너스 */
export function comboMultiplier(combo: number): number {
  return 1 + Math.min(combo, 10) * 0.1;
}

/** 데미지 = 친 타수 × 콤보 배율 */
export function damageFor(target: string, combo: number): number {
  return Math.round(countKeystrokes(target) * comboMultiplier(combo));
}

/** 낱말을 맞히면 친 타수만큼 공격 게이지를 밀어낸다 (긴 문장일수록 많이) */
export function chargeAfterHit(charge: number, target: string): number {
  return Math.max(0, charge - countKeystrokes(target) * RELIEF_PER_KEY);
}

export function clearBonus(hearts: number): number {
  return hearts * 500;
}
