import { describe, expect, it } from 'vitest';
import { STAGES, fingerFor, isCorrectPress, makeSequence } from './layout';

const stage = (id: string) => STAGES.find((s) => s.id === id)!;

describe('STAGES', () => {
  it('기본 자리 한글은 ㅁㄴㅇㄹㅎㅗㅓㅏㅣ', () => {
    expect(stage('home').targets('ko').map((t) => t.label).join('')).toBe('ㅁㄴㅇㄹㅎㅗㅓㅏㅣ');
  });

  it('기본 자리 영문은 세미콜론 포함', () => {
    expect(stage('home').targets('en').map((t) => t.label).join('')).toBe('asdfghjkl;');
  });

  it('전체 단계 한글 Shift 글자는 쌍자음과 ㅒㅖ만', () => {
    const shifted = stage('all').targets('ko').filter((t) => t.shift).map((t) => t.label).join('');
    expect(shifted).toBe('ㅃㅉㄸㄲㅆㅒㅖ');
  });
});

describe('isCorrectPress', () => {
  const [ka] = stage('all').targets('ko').filter((t) => t.label === 'ㄲ');
  const [g] = stage('top').targets('ko').filter((t) => t.label === 'ㄱ');
  const [m] = stage('home').targets('ko').filter((t) => t.label === 'ㅁ');

  it('물리 키와 Shift가 맞아야 정답', () => {
    expect(isCorrectPress(ka, 'KeyR', true, 'ko')).toBe(true);
    expect(isCorrectPress(ka, 'KeyR', false, 'ko')).toBe(false);
    expect(isCorrectPress(g, 'KeyR', true, 'ko')).toBe(false);
  });

  it('Shift가 의미 없는 키는 Shift를 눌러도 정답', () => {
    expect(isCorrectPress(m, 'KeyA', true, 'ko')).toBe(true);
  });

  it('다른 키는 오답', () => {
    expect(isCorrectPress(m, 'KeyS', false, 'ko')).toBe(false);
  });
});

describe('makeSequence', () => {
  it('같은 글자가 연속으로 나오지 않는다', () => {
    const seq = makeSequence(stage('home').targets('ko'), 200);
    expect(seq).toHaveLength(200);
    for (let i = 1; i < seq.length; i++) expect(seq[i].label).not.toBe(seq[i - 1].label);
  });
});

describe('fingerFor', () => {
  it('Shift 글자는 반대 손 새끼손가락 안내', () => {
    const [ka] = stage('all').targets('ko').filter((t) => t.label === 'ㄲ');
    expect(fingerFor(ka)).toBe('왼손 검지 + 오른손 새끼(Shift)');
  });
});
