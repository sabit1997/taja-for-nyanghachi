import type { Lang } from './layout';

export type Mode = 'keys' | 'words' | 'sentences';

export const MODE_NAMES: Record<Mode, string> = {
  keys: '자리 연습',
  words: '낱말 연습',
  sentences: '짧은 글 연습',
};

export interface PracticeRecord {
  mode: Mode;
  lang: Lang;
  cpm: number;
  accuracy: number;
  durationMs: number;
  date: number;
  detail?: string;
}

export interface Settings {
  sound: boolean;
  crt: boolean;
  boot: boolean;
  lang: Lang;
}

// 키 이름은 사이트 이름이 바뀌어도 기존 기록을 지키려고 그대로 둔다
const SETTINGS_KEY = 'taja.settings';
const RECORDS_KEY = 'taja.records';
const MAX_RECORDS = 300;

export const DEFAULT_SETTINGS: Settings = { sound: true, crt: false, boot: false, lang: 'ko' };

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // 저장소를 못 쓰는 환경(시크릿 모드 등)에서는 기록 없이 동작한다
  }
}

export function loadSettings(): Settings {
  return { ...DEFAULT_SETTINGS, ...read<Partial<Settings>>(SETTINGS_KEY, {}) };
}

export function saveSettings(settings: Settings) {
  write(SETTINGS_KEY, settings);
}

export function loadRecords(): PracticeRecord[] {
  const records = read<PracticeRecord[]>(RECORDS_KEY, []);
  return Array.isArray(records) ? records : [];
}

export function addRecord(record: PracticeRecord) {
  write(RECORDS_KEY, [...loadRecords(), record].slice(-MAX_RECORDS));
}
