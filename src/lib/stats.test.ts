import { describe, expect, it } from 'vitest';
import { accuracy, compareLine, cpm, grade, gradeLevel } from './stats';

describe('compareLine', () => {
  it('맞은 글자와 틀린 글자를 구분한다', () => {
    const r = compareLine('abc', 'abx', false);
    expect(r.states).toEqual(['ok', 'ok', 'bad']);
    expect(r.correctChars).toBe(2);
    expect(r.correctKeys).toBe(2);
    expect(r.judged).toBe(3);
  });

  it('아직 안 친 글자는 todo', () => {
    expect(compareLine('abc', 'a', false).states).toEqual(['ok', 'todo', 'todo']);
  });

  it('조합 중인 마지막 글자는 판정하지 않는다', () => {
    const r = compareLine('닭고기', '달', true);
    expect(r.states).toEqual(['pending', 'todo', 'todo']);
    expect(r.judged).toBe(0);
  });

  it('조합이 끝나면 마지막 글자도 판정한다', () => {
    expect(compareLine('닭고기', '달', false).states[0]).toBe('bad');
    expect(compareLine('닭고기', '닭', false).states[0]).toBe('ok');
  });

  it('맞은 한글은 자모 단위로 타수를 센다', () => {
    expect(compareLine('닭고기', '닭고', false).correctKeys).toBe(4 + 2);
  });

  it('목표보다 길게 친 글자는 오타로 센다', () => {
    const r = compareLine('ab', 'abcd', false);
    expect(r.extra).toBe(2);
    expect(r.judged).toBe(4);
  });

  it('초과 입력 중 조합 중인 글자는 제외', () => {
    expect(compareLine('가', '가나', true).extra).toBe(0);
  });
});

describe('cpm', () => {
  it('분당 타수를 계산한다', () => {
    expect(cpm(100, 30_000)).toBe(200);
  });

  it('1초 미만은 0', () => {
    expect(cpm(5, 500)).toBe(0);
  });
});

describe('accuracy', () => {
  it('백분율 정수', () => {
    expect(accuracy(49, 50)).toBe(98);
  });

  it('입력이 없으면 100', () => {
    expect(accuracy(0, 0)).toBe(100);
  });
});

describe('grade', () => {
  it('타수 구간별 등급', () => {
    expect(grade(50)).toBe('브론즈');
    expect(grade(100)).toBe('실버');
    expect(grade(320)).toBe('플래티넘');
    expect(grade(499)).toBe('다이아몬드');
    expect(grade(3000)).toBe('마스터');
  });

  it('등급 단계는 0~5', () => {
    expect(gradeLevel(0)).toBe(0);
    expect(gradeLevel(250)).toBe(2);
    expect(gradeLevel(900)).toBe(5);
  });
});
