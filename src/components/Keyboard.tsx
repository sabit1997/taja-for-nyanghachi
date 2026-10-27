import { ROWS, type Lang } from '../lib/layout';

interface Props {
  lang: Lang;
  targetCode?: string;
  shiftSide?: 'left' | 'right' | null;
  wrongCode?: string | null;
}

export function Keyboard({ lang, targetCode, shiftSide, wrongCode }: Props) {
  const cls = (code: string, extra = '') =>
    ['key', extra, code === targetCode && 'key-target', code === wrongCode && 'key-wrong'].filter(Boolean).join(' ');

  return (
    <div className="keyboard" aria-hidden>
      {ROWS.map((row, r) => (
        <div key={r} className={`kb-row kb-row-${r}`}>
          {r === 2 && <div className={`key key-wide ${shiftSide === 'left' ? 'key-target' : ''}`}>Shift</div>}
          {row.map((k) => (
            <div key={k.code} className={cls(k.code, k.code === 'KeyF' || k.code === 'KeyJ' ? 'key-home' : '')}>
              <span className="key-main">{lang === 'ko' ? k.ko : k.en.toUpperCase()}</span>
              {lang === 'ko' && k.koShift !== k.ko && <span className="key-sub">{k.koShift}</span>}
            </div>
          ))}
          {r === 2 && <div className={`key key-wide ${shiftSide === 'right' ? 'key-target' : ''}`}>Shift</div>}
        </div>
      ))}
      <div className="kb-row">
        <div className="key key-space" />
      </div>
    </div>
  );
}
