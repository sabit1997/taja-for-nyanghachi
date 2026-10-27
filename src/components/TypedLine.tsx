import type { CharState, LineResult } from '../lib/stats';

interface Props {
  target: string;
  typed: string;
  composing: boolean;
  result: LineResult;
}

/** 목표 줄과, 그 아래에 글자별로 색칠한 입력 줄 */
export function TypedLine({ target, typed, composing, result }: Props) {
  const stateAt = (i: number): CharState => {
    if (i < target.length) return result.states[i];
    return composing && i === typed.length - 1 ? 'pending' : 'bad';
  };

  return (
    <div className="typed-line">
      <div className="line-target">
        {[...target].map((ch, i) => (
          <span key={i} className={i === typed.length ? 'next' : undefined}>
            {ch}
          </span>
        ))}
      </div>
      <div className="line-typed">
        {[...typed].map((ch, i) => {
          const state = stateAt(i);
          return (
            <span key={i} className={`ch-${state}`}>
              {ch === ' ' && state === 'bad' ? '_' : ch}
            </span>
          );
        })}
        <span className="cursor">█</span>
      </div>
    </div>
  );
}
