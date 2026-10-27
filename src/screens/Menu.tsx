import { useState } from 'react';
import { DECO, MENU_ICONS } from '../assets/icons';
import { DosWindow } from '../components/DosWindow';
import { useKeydown } from '../lib/hooks';
import type { Lang } from '../lib/layout';
import { sound } from '../lib/sound';

export type MenuTarget = 'keys' | 'words' | 'sentences' | 'records' | 'settings';

const ITEMS: [MenuTarget, string][] = [
  ['keys', '자리 연습'],
  ['words', '낱말 연습'],
  ['sentences', '짧은 글 연습'],
  ['records', '기록 보기'],
  ['settings', '설정'],
];

// 5x5 픽셀 글자: T A J A
const LOGO = [
  '█████  ███    ███  ███ ',
  '  █   █   █     █ █   █',
  '  █   █████     █ █████',
  '  █   █   █ █   █ █   █',
  '  █   █   █  ███  █   █',
];

interface Props {
  lang: Lang;
  initial: MenuTarget;
  onSelect: (target: MenuTarget) => void;
  onToggleLang: () => void;
}

export function Menu({ lang, initial, onSelect, onToggleLang }: Props) {
  const [cursor, setCursor] = useState(() => Math.max(0, ITEMS.findIndex(([id]) => id === initial)));

  const move = (delta: number) => {
    sound.move();
    setCursor((c) => (c + delta + ITEMS.length) % ITEMS.length);
  };

  const choose = (i: number) => {
    sound.select();
    onSelect(ITEMS[i][0]);
  };

  useKeydown((e) => {
    if (e.key === 'ArrowUp') move(-1);
    else if (e.key === 'ArrowDown') move(1);
    else if (e.key === 'Enter') choose(cursor);
    else if (/^[1-5]$/.test(e.key)) choose(Number(e.key) - 1);
    else return;
    // 다음 화면의 입력창이 바로 포커스를 받으므로, 메뉴에서 누른 숫자가 그대로 입력되지 않게 막는다
    e.preventDefault();
  });

  return (
    <DosWindow title="TAJA v1.0" width="narrow">
      <img className="deco deco-moon" src={DECO.moon} alt="" />
      <img className="deco deco-planet" src={DECO.planet} alt="" />
      <div className="logo" role="img" aria-label="TAJA">
        {LOGO.map((line, y) =>
          [...line].map((px, x) => <span key={`${x}-${y}`} className={px === '█' ? 'px on' : 'px'} />),
        )}
      </div>
      <p className="subtitle">레트로 타자연습 · (C) 1995 TAJA SOFT</p>

      <ul className="menu" role="menu">
        {ITEMS.map(([id, label], i) => (
          <li
            key={id}
            role="menuitem"
            className={i === cursor ? 'selected' : undefined}
            onMouseEnter={() => setCursor(i)}
            onClick={() => choose(i)}
          >
            <span className="menu-arrow">{i === cursor ? '▶' : ' '}</span>
            <img className="menu-icon" src={MENU_ICONS[id]} alt="" />
            {i + 1}. {label}
          </li>
        ))}
      </ul>

      <div className="lang-toggle" onClick={onToggleLang} role="button">
        연습 언어
        <span className={lang === 'ko' ? 'on' : undefined}>한글</span>
        <span className={lang === 'en' ? 'on' : undefined}>English</span>
        <span className="dim">(Tab)</span>
      </div>
    </DosWindow>
  );
}
