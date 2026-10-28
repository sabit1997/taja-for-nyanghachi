import type { Lang } from '../lib/layout';

interface Props {
  hints: [key: string, label: string][];
  lang: Lang;
}

export function StatusBar({ hints, lang }: Props) {
  return (
    <footer className="statusbar">
      <div className="statusbar-hints">
        {hints.map(([key, label]) => (
          <span key={key}>
            <b>{key}</b> {label}
          </span>
        ))}
      </div>
      <div className="statusbar-lang">{lang === 'ko' ? '[한글]' : '[ENG]'}</div>
    </footer>
  );
}
