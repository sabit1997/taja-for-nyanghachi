import { describe, expect, it } from 'vitest';
import { DIFFICULTIES, STAGES, chargeAfterHit, clearBonus, comboMultiplier, damageFor, difficultyById, scaleStage } from './stages';

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

describe('chargeAfterHit', () => {
  it('타수만큼만 게이지를 밀어낸다', () => {
    // '강아지' = 3+2+2 = 7타 → 7 × 0.045 = 0.315
    expect(chargeAfterHit(0.8, '강아지')).toBeCloseTo(0.485);
  });

  it('0 아래로는 내려가지 않는다', () => {
    expect(chargeAfterHit(0.1, '강아지')).toBe(0);
  });

  it('긴 문장은 게이지를 크게 비운다', () => {
    expect(chargeAfterHit(1, '천 리 길도 한 걸음부터.')).toBe(0);
  });
});

describe('clearBonus', () => {
  it('남은 하트당 500점', () => {
    expect(clearBonus(3)).toBe(1500);
  });
});

describe('STAGES', () => {
  it('스테이지마다 칠 거리가 넉넉하다 (문장 스테이지는 5개 이상)', () => {
    for (const stage of STAGES) {
      for (const lang of ['ko', 'en'] as const) {
        expect(stage.targets(lang).length).toBeGreaterThanOrEqual(stage.boss ? 5 : 15);
      }
    }
  });

  it('스테이지 id가 겹치지 않는다', () => {
    expect(new Set(STAGES.map((s) => s.id)).size).toBe(STAGES.length);
  });

  it('첫 스테이지는 짧은 낱말만', () => {
    for (const w of STAGES[0].targets('ko')) expect(w.length).toBeLessThanOrEqual(3);
    for (const w of STAGES[0].targets('en')) expect(w.length).toBeLessThanOrEqual(5);
  });

  it('월드마다 마지막은 보스, 최종 보스는 맨 끝 한 번', () => {
    expect(STAGES.filter((s) => s.boss === 'final')).toHaveLength(1);
    expect(STAGES[STAGES.length - 1].boss).toBe('final');
    for (const world of new Set(STAGES.map((s) => s.id.split('-')[0]))) {
      const stages = STAGES.filter((s) => s.id.startsWith(`${world}-`));
      expect(stages[stages.length - 1].boss).toBeDefined();
    }
  });
});

describe('difficulty', () => {
  it('어려울수록 적이 단단하고 빠르고 오타에 엄격하다', () => {
    for (let i = 1; i < DIFFICULTIES.length; i++) {
      expect(DIFFICULTIES[i].hpScale).toBeGreaterThan(DIFFICULTIES[i - 1].hpScale);
      expect(DIFFICULTIES[i].attackScale).toBeLessThan(DIFFICULTIES[i - 1].attackScale);
      expect(DIFFICULTIES[i].wrongPenalty).toBeGreaterThan(DIFFICULTIES[i - 1].wrongPenalty);
    }
  });

  it('scaleStage는 체력과 공격 주기만 바꾼다', () => {
    const hard = scaleStage(STAGES[0], difficultyById('hard'));
    expect(hard.hp).toBe(Math.round(STAGES[0].hp * 1.2));
    expect(hard.attackMs).toBe(Math.round(STAGES[0].attackMs * 0.85));
    expect(hard.enemy).toBe(STAGES[0].enemy);
  });

  it('모르는 id는 보통으로', () => {
    expect(difficultyById('???').id).toBe('normal');
  });
});
