import alienSprite from '../assets/icons/deco-alien.png';
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
  boss?: boolean;
  hp: number;
  /** 적의 공격 게이지가 가득 차는 데 걸리는 시간 */
  attackMs: number;
  targets: (lang: Lang) => string[];
}

const shortWords = (lang: Lang) => WORDS[lang].filter((w) => w.length <= (lang === 'ko' ? 3 : 5));

export const STAGES: StageDef[] = [
  {
    id: '1-1',
    label: 'STAGE 1-1',
    enemy: '꼬마 UFO',
    sprite: ufoSprite,
    hp: 40,
    attackMs: 8000,
    targets: (lang) => pickRandom(shortWords(lang), 40),
  },
  {
    id: '1-2',
    label: 'STAGE 1-2',
    enemy: '초록 외계인',
    sprite: alienSprite,
    hp: 70,
    attackMs: 6500,
    targets: (lang) => pickRandom(WORDS[lang], 60),
  },
  {
    id: '1-3',
    label: 'BOSS',
    enemy: '마스터 UFO',
    sprite: bossSprite,
    boss: true,
    hp: 160,
    attackMs: 11000,
    targets: (lang) => pickRandom(SENTENCES[lang], 20),
  },
];

export const MAX_HEARTS = 5;
export const WRONG_PENALTY = 0.2;

/** 콤보 10까지 10%씩 보너스 */
export function comboMultiplier(combo: number): number {
  return 1 + Math.min(combo, 10) * 0.1;
}

/** 데미지 = 친 타수 × 콤보 배율 */
export function damageFor(target: string, combo: number): number {
  return Math.round(countKeystrokes(target) * comboMultiplier(combo));
}

export function clearBonus(hearts: number): number {
  return hearts * 500;
}
