import { describe, expect, it } from 'vitest';
import { STAGES, clearBonus, comboMultiplier, damageFor } from './stages';

describe('comboMultiplier', () => {
  it('콤보마다 10%씩, 10콤보에서 멈춘다', () => {
    expect(comboMultiplier(0)).toBe(1);
    expect(comboMultiplier(5)).toBeCloseTo(1.5);
    expect(comboMultiplier(30)).toBeCloseTo(2);
  });
});

describe('damageFor', () => {
  it('타수에 콤보 배율을 곱한다', () => {
    expect(damageFor('닭', 0)).toBe(4);
    expect(damageFor('닭', 5)).toBe(6);
    expect(damageFor('cat', 0)).toBe(3);
  });
});

describe('clearBonus', () => {
  it('남은 하트당 500점', () => {
    expect(clearBonus(3)).toBe(1500);
  });
});

describe('STAGES', () => {
  it('스테이지마다 칠 거리가 넉넉하다', () => {
    for (const stage of STAGES) {
      for (const lang of ['ko', 'en'] as const) {
        expect(stage.targets(lang).length).toBeGreaterThanOrEqual(15);
      }
    }
  });

  it('첫 스테이지는 짧은 낱말만', () => {
    for (const w of STAGES[0].targets('ko')) expect(w.length).toBeLessThanOrEqual(3);
    for (const w of STAGES[0].targets('en')) expect(w.length).toBeLessThanOrEqual(5);
  });

  it('보스는 마지막 한 번', () => {
    expect(STAGES.filter((s) => s.boss)).toHaveLength(1);
    expect(STAGES[STAGES.length - 1].boss).toBe(true);
  });
});
