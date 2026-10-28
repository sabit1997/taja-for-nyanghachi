import { describe, expect, it } from 'vitest';
import { LINE_WIDTH, LONG_TEXTS, groupWorks, toLines } from './longTexts';

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

describe('groupWorks', () => {
  const t = (id: string, series?: string) => ({ id, title: id, author: 'a', body: 'x', series });

  it('같은 series는 한 작품으로 묶고 순서를 지킨다', () => {
    const works = groupWorks([t('poem'), t('n-1', '소설'), t('n-2', '소설'), t('story')]);
    expect(works.map((w) => w.title)).toEqual(['poem', '소설', 'story']);
    expect(works[1].parts.map((p) => p.id)).toEqual(['n-1', 'n-2']);
  });

  it('위키문헌 소설은 편마다 (i/n) 제목이 맞는다', () => {
    for (const work of groupWorks(LONG_TEXTS.ko).filter((w) => w.parts.length > 1)) {
      work.parts.forEach((part, i) => expect(part.title).toBe(`${work.title} (${i + 1}/${work.parts.length})`));
    }
  });
});
