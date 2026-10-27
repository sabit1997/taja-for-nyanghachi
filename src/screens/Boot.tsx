import { useEffect, useState } from 'react';
import { useKeydown } from '../lib/hooks';

const LINES = [
  'TAJA BIOS v1.0  (C) 1995 TAJA SOFT',
  '',
  'Main Processor : 486DX2-66',
  'Memory Test    : 640K OK',
  'Keyboard       : 101-key 두벌식 Detected',
  'Sound Blaster  : A220 I5 D1',
  '',
  'Starting MS-DOS...',
  '',
  'C:\\> TAJA.EXE',
];

export function Boot({ onDone }: { onDone: () => void }) {
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (shown >= LINES.length) {
      const id = setTimeout(onDone, 700);
      return () => clearTimeout(id);
    }
    const id = setTimeout(() => setShown((n) => n + 1), shown === 3 ? 600 : 180);
    return () => clearTimeout(id);
  }, [shown, onDone]);

  useKeydown(() => onDone());

  return (
    <div className="boot" onClick={onDone}>
      {LINES.slice(0, shown).map((line, i) => (
        <div key={i}>{line || '\u00a0'}</div>
      ))}
      <span className="cursor">█</span>
    </div>
  );
}
