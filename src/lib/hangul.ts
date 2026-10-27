const SYLLABLE_START = 0xac00;
const SYLLABLE_END = 0xd7a3;

// 두벌식에서 두 번 눌러야 하는 겹모음 (ㅘ ㅙ ㅚ ㅝ ㅞ ㅟ ㅢ) — 중성 인덱스
const COMPOUND_JUNG = new Set([9, 10, 11, 14, 15, 16, 19]);
// 겹받침 (ㄳ ㄵ ㄶ ㄺ ㄻ ㄼ ㄽ ㄾ ㄿ ㅀ ㅄ) — 종성 인덱스
const COMPOUND_JONG = new Set([3, 5, 6, 9, 10, 11, 12, 13, 14, 15, 18]);
// 호환용 자모 중 두 번 눌러야 하는 것
const COMPOUND_COMPAT = new Set('ㄳㄵㄶㄺㄻㄼㄽㄾㄿㅀㅄㅘㅙㅚㅝㅞㅟㅢ');

export function isHangulSyllable(ch: string): boolean {
  const code = ch.charCodeAt(0);
  return code >= SYLLABLE_START && code <= SYLLABLE_END;
}

export function isHangul(ch: string): boolean {
  const code = ch.charCodeAt(0);
  return isHangulSyllable(ch) || (code >= 0x3131 && code <= 0x318e);
}

/** 한 글자를 치는 데 필요한 키 입력 수. 쌍자음·대문자처럼 Shift를 쓰는 키는 1타로 센다. */
export function keystrokes(ch: string): number {
  if (isHangulSyllable(ch)) {
    const index = ch.charCodeAt(0) - SYLLABLE_START;
    const jung = Math.floor((index % 588) / 28);
    const jong = index % 28;
    const jungKeys = COMPOUND_JUNG.has(jung) ? 2 : 1;
    const jongKeys = jong === 0 ? 0 : COMPOUND_JONG.has(jong) ? 2 : 1;
    return 1 + jungKeys + jongKeys;
  }
  if (COMPOUND_COMPAT.has(ch)) return 2;
  return 1;
}

export function countKeystrokes(text: string): number {
  let total = 0;
  for (const ch of text) total += keystrokes(ch);
  return total;
}
