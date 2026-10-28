import { describe, expect, it } from 'vitest';
import { countKeystrokes, isHangul, keystrokes } from './hangul';

describe('keystrokes', () => {
  it('받침 없는 글자는 초성+중성 2타', () => {
    expect(keystrokes('가')).toBe(2);
  });

  it('받침 있는 글자는 3타', () => {
    expect(keystrokes('각')).toBe(3);
  });

  it('겹받침은 2타로 센다', () => {
    expect(keystrokes('닭')).toBe(4);
    expect(keystrokes('없')).toBe(4);
  });

  it('겹모음은 2타로 센다', () => {
    expect(keystrokes('과')).toBe(3);
    expect(keystrokes('왜')).toBe(3);
    expect(keystrokes('의')).toBe(3);
  });

  it('단일 키 모음(ㅐ ㅔ ㅒ ㅖ)은 1타', () => {
    expect(keystrokes('개')).toBe(2);
    expect(keystrokes('예')).toBe(2);
  });

  it('쌍자음은 Shift 포함 1타', () => {
    expect(keystrokes('까')).toBe(2);
    expect(keystrokes('있')).toBe(3);
  });

  it('호환용 자모', () => {
    expect(keystrokes('ㄱ')).toBe(1);
    expect(keystrokes('ㅘ')).toBe(2);
    expect(keystrokes('ㄳ')).toBe(2);
  });

  it('영문·숫자·공백은 1타', () => {
    expect(keystrokes('a')).toBe(1);
    expect(keystrokes('A')).toBe(1);
    expect(keystrokes(' ')).toBe(1);
    expect(keystrokes('7')).toBe(1);
  });

  it('문장 전체 타수', () => {
    expect(countKeystrokes('안녕 hi')).toBe(3 + 3 + 1 + 2);
  });
});

describe('isHangul', () => {
  it('음절과 자모를 한글로 판정', () => {
    expect(isHangul('가')).toBe(true);
    expect(isHangul('ㅎ')).toBe(true);
    expect(isHangul('a')).toBe(false);
  });
});
