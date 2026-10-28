import { useState } from 'react';
import { DosWindow } from '../components/DosWindow';
import { useKeydown } from '../lib/hooks';
import { sound } from '../lib/sound';
import type { Settings } from '../lib/storage';

type Toggle = 'sound' | 'crt' | 'boot';

const ITEMS: [Toggle, string, string][] = [
  ['sound', '효과음', '키 입력·오타·완료 소리'],
  ['crt', 'CRT 효과', '스캔라인과 브라운관 번짐'],
  ['boot', '부팅 화면', '시작할 때 DOS 부팅 연출'],
];

interface Props {
  settings: Settings;
  onChange: (settings: Settings) => void;
  onExit: () => void;
}

export function SettingsScreen({ settings, onChange, onExit }: Props) {
  const [cursor, setCursor] = useState(0);

  const toggle = (i: number) => {
    const key = ITEMS[i][0];
    onChange({ ...settings, [key]: !settings[key] });
    sound.select();
  };

  useKeydown((e) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      sound.move();
      setCursor((c) => (c + (e.key === 'ArrowUp' ? -1 : 1) + ITEMS.length) % ITEMS.length);
    } else if (['Enter', ' ', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
      e.preventDefault();
      toggle(cursor);
    } else if (e.key === 'Escape') {
      onExit();
    }
  });

  return (
    <DosWindow title="설정" width="narrow">
      <ul className="menu settings">
        {ITEMS.map(([key, label, desc], i) => (
          <li
            key={key}
            className={i === cursor ? 'selected' : undefined}
            onMouseEnter={() => setCursor(i)}
            onClick={() => toggle(i)}
          >
            <span className="menu-arrow">{i === cursor ? '▶' : ' '}</span>
            <span className="setting-label">{label}</span>
            <span className="setting-value">[{settings[key] ? 'ON ' : 'OFF'}]</span>
            <span className="setting-desc">{desc}</span>
          </li>
        ))}
      </ul>
      <p className="dim">Enter / Space 로 켜고 끄기 · ESC 뒤로</p>
    </DosWindow>
  );
}
