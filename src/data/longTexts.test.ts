import { describe, expect, it } from 'vitest';
import { LINE_WIDTH, LONG_TEXTS, toLines } from './longTexts';

describe('toLines', () => {
  it('빈 줄은 건너뛴다', () => {
    expect(toLines('가나\n\n다라', 30)).toEqual(['가나', '다라']);
  });

  it('긴 줄은 띄어쓰기 기준으로 나눈다', () => {
    expect(toLines('aaa bbb ccc ddd', 7)).toEqual(['aaa bbb', 'ccc ddd']);
  });

  it('한 단어가 한계보다 길면 그대로 한 줄', () => {
    expect(toLines('abcdefghij xy', 5)).toEqual(['abcdefghij', 'xy']);
  });

  it('앞뒤 공백과 연속 공백을 정리한다', () => {
    expect(toLines('  a   b  ', 10)).toEqual(['a b']);
  });
});

describe('LONG_TEXTS', () => {
  it('모든 글이 한 줄 너비 안으로 나뉜다', () => {
    for (const lang of ['ko', 'en'] as const) {
      for (const text of LONG_TEXTS[lang]) {
        const lines = toLines(text.body, LINE_WIDTH[lang]);
        expect(lines.length).toBeGreaterThan(0);
        for (const line of lines) expect(line.length).toBeLessThanOrEqual(LINE_WIDTH[lang]);
      }
    }
  });

  it('id가 겹치지 않는다', () => {
    const ids = [...LONG_TEXTS.ko, ...LONG_TEXTS.en].map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
