export type Lang = 'ko' | 'en';

export interface KeyDef {
  code: string;
  en: string;
  enShift: string;
  ko: string;
  koShift: string;
}

function row(chars: string, ko: string, koShift: string, enShift: string): KeyDef[] {
  const codes: Record<string, string> = { ';': 'Semicolon', ',': 'Comma', '.': 'Period', '/': 'Slash' };
  return [...chars].map((en, i) => ({
    code: codes[en] ?? `Key${en.toUpperCase()}`,
    en,
    enShift: enShift[i],
    ko: ko[i],
    koShift: koShift[i],
  }));
}

// 두벌식 표준 배열
export const ROWS: KeyDef[][] = [
  row('qwertyuiop', 'ㅂㅈㄷㄱㅅㅛㅕㅑㅐㅔ', 'ㅃㅉㄸㄲㅆㅛㅕㅑㅒㅖ', 'QWERTYUIOP'),
  row('asdfghjkl;', 'ㅁㄴㅇㄹㅎㅗㅓㅏㅣ;', 'ㅁㄴㅇㄹㅎㅗㅓㅏㅣ:', 'ASDFGHJKL:'),
  row('zxcvbnm,./', 'ㅋㅌㅊㅍㅠㅜㅡ,./', 'ㅋㅌㅊㅍㅠㅜㅡ<>?', 'ZXCVBNM<>?'),
];

const ALL_KEYS = ROWS.flat();

const FINGERS: Record<string, string> = {
  q: '왼손 새끼', a: '왼손 새끼', z: '왼손 새끼',
  w: '왼손 약지', s: '왼손 약지', x: '왼손 약지',
  e: '왼손 중지', d: '왼손 중지', c: '왼손 중지',
  r: '왼손 검지', f: '왼손 검지', v: '왼손 검지', t: '왼손 검지', g: '왼손 검지', b: '왼손 검지',
  y: '오른손 검지', h: '오른손 검지', n: '오른손 검지', u: '오른손 검지', j: '오른손 검지', m: '오른손 검지',
  i: '오른손 중지', k: '오른손 중지', ',': '오른손 중지',
  o: '오른손 약지', l: '오른손 약지', '.': '오른손 약지',
  p: '오른손 새끼', ';': '오른손 새끼', '/': '오른손 새끼',
};

const LEFT_HAND = new Set('qwertasdfgzxcvb');

export interface KeyTarget {
  key: KeyDef;
  shift: boolean;
  label: string;
}

export interface Stage {
  id: string;
  name: string;
  targets: (lang: Lang) => KeyTarget[];
}

function plain(keys: KeyDef[], lang: Lang): KeyTarget[] {
  return keys
    .filter((k) => /[a-z]/.test(k.en) || (lang === 'en' && k.en === ';'))
    .map((k) => ({ key: k, shift: false, label: lang === 'ko' ? k.ko : k.en }));
}

function shifted(lang: Lang): KeyTarget[] {
  return ALL_KEYS.filter((k) => /[a-z]/.test(k.en) && (lang === 'en' || k.ko !== k.koShift)).map((k) => ({
    key: k,
    shift: true,
    label: lang === 'ko' ? k.koShift : k.enShift,
  }));
}

export const STAGES: Stage[] = [
  { id: 'home', name: '1단계: 기본 자리', targets: (lang) => plain(ROWS[1], lang) },
  { id: 'top', name: '2단계: 윗줄', targets: (lang) => plain(ROWS[0], lang) },
  { id: 'bottom', name: '3단계: 아랫줄', targets: (lang) => plain(ROWS[2], lang) },
  { id: 'all', name: '4단계: 전체 + Shift', targets: (lang) => [...plain(ALL_KEYS, lang), ...shifted(lang)] },
];

/** 바로 앞 글자와 겹치지 않게 무작위 순서를 만든다 */
export function makeSequence(targets: KeyTarget[], length: number, random = Math.random): KeyTarget[] {
  const seq: KeyTarget[] = [];
  for (let i = 0; i < length; i++) {
    let next = targets[Math.floor(random() * targets.length)];
    if (targets.length > 1) {
      while (seq.length > 0 && next.label === seq[seq.length - 1].label) {
        next = targets[Math.floor(random() * targets.length)];
      }
    }
    seq.push(next);
  }
  return seq;
}

/** 이 키에서 Shift 여부가 다른 글자를 만드는지 */
export function shiftMatters(key: KeyDef, lang: Lang): boolean {
  return lang === 'en' ? key.en !== key.enShift : key.ko !== key.koShift;
}

export function isCorrectPress(target: KeyTarget, code: string, shiftKey: boolean, lang: Lang): boolean {
  if (code !== target.key.code) return false;
  return !shiftMatters(target.key, lang) || shiftKey === target.shift;
}

export function fingerFor(target: KeyTarget): string {
  const finger = FINGERS[target.key.en];
  if (!target.shift) return finger;
  const shiftSide = LEFT_HAND.has(target.key.en) ? '오른손' : '왼손';
  return `${finger} + ${shiftSide} 새끼(Shift)`;
}

export function shiftSideFor(target: KeyTarget): 'left' | 'right' | null {
  if (!target.shift) return null;
  return LEFT_HAND.has(target.key.en) ? 'right' : 'left';
}

export function keyByCode(code: string): KeyDef | undefined {
  return ALL_KEYS.find((k) => k.code === code);
}
