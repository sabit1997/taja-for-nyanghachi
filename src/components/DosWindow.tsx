import type { ReactNode } from 'react';

interface Props {
  title: string;
  right?: ReactNode;
  width?: 'narrow' | 'wide';
  children: ReactNode;
}

export function DosWindow({ title, right, width = 'wide', children }: Props) {
  return (
    <section className={`window window-${width}`}>
      <h1 className="window-title">{title}</h1>
      {right !== undefined && <div className="window-right">{right}</div>}
      <div className="window-body">{children}</div>
    </section>
  );
}
