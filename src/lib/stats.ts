import { keystrokes } from './hangul';

export type CharState = 'todo' | 'ok' | 'bad' | 'pending';

export interface LineResult {
  states: CharState[];
  /** 목표보다 더 친 글자 수 (전부 오타) */
  extra: number;
  correctChars: number;
  correctKeys: number;
  /** 판정이 끝난 글자 수 (조합 중인 글자 제외, 초과 입력 포함) */
  judged: number;
}

/**
 * 목표 문장과 입력을 글자 단위로 비교한다.
 * 한글 조합 중(composing)인 마지막 글자는 확정 전까지 판정하지 않는다.
 */
export function compareLine(target: string, typed: string, composing: boolean): LineResult {
  const states: CharState[] = [];
  let correctChars = 0;
  let correctKeys = 0;
  let judged = 0;
  const pendingIndex = composing ? typed.length - 1 : -1;

  for (let i = 0; i < target.length; i++) {
    if (i >= typed.length) {
      states.push('todo');
    } else if (i === pendingIndex) {
      states.push('pending');
    } else if (typed[i] === target[i]) {
      states.push('ok');
      correctChars++;
      correctKeys += keystrokes(target[i]);
      judged++;
    } else {
      states.push('bad');
      judged++;
    }
  }

  const extraEnd = composing ? typed.length - 1 : typed.length;
  const extra = Math.max(0, extraEnd - target.length);
  judged += extra;

  return { states, extra, correctChars, correctKeys, judged };
}

/** 분당 타수 */
export function cpm(keys: number, elapsedMs: number): number {
  if (elapsedMs < 1000) return 0;
  return Math.round((keys / elapsedMs) * 60_000);
}

/** 정확도 (0~100 정수) */
export function accuracy(correct: number, total: number): number {
  if (total === 0) return 100;
  return Math.round((correct / total) * 100);
}

export const GRADES = ['브론즈', '실버', '골드', '플래티넘', '다이아몬드', '마스터'] as const;

/** 타수 100타 단위로 등급 단계(0~5) */
export function gradeLevel(score: number): number {
  return Math.min(GRADES.length - 1, Math.max(0, Math.floor(score / 100)));
}

export function grade(score: number): string {
  return GRADES[gradeLevel(score)];
}
