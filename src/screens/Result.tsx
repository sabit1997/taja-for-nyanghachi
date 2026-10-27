import { useEffect, useState } from 'react';
import { DECO, GRADE_ICONS, MENU_ICONS } from '../assets/icons';
import { DosWindow } from '../components/DosWindow';
import { formatDuration } from '../lib/format';
import { useKeydown } from '../lib/hooks';
import { grade, gradeLevel } from '../lib/stats';
import { MODE_NAMES, type PracticeRecord } from '../lib/storage';

interface Props {
  record: PracticeRecord;
  previousBest: number | null;
  onRetry: () => void;
  onExit: () => void;
}

export function Result({ record, previousBest, onRetry, onExit }: Props) {
  // 마지막 줄을 제출한 Enter가 바로 '다시 하기'로 이어지지 않게 잠깐 입력을 막는다
  const [armed, setArmed] = useState(false);
  useEffect(() => {
    const id = setTimeout(() => setArmed(true), 600);
    return () => clearTimeout(id);
  }, []);

  useKeydown((e) => {
    if (!armed) return;
    if (e.key === 'Enter') onRetry();
    else if (e.key === 'Escape') onExit();
  });

  const isBest = previousBest === null || record.cpm > previousBest;

  return (
    <DosWindow title="결과" width="narrow">
      <p className="dim center">
        {MODE_NAMES[record.mode]} · {record.lang === 'ko' ? '한글' : 'English'}
        {record.detail && ` · ${record.detail}`}
      </p>
      <div className="result-main">
        <div>
          <div className="result-label">타수</div>
          <div className="result-value">{record.cpm}</div>
        </div>
        <div>
          <div className="result-label">정확도</div>
          <div className="result-value">{record.accuracy}%</div>
        </div>
        <div>
          <div className="result-label">시간</div>
          <div className="result-value">{formatDuration(record.durationMs)}</div>
        </div>
      </div>
      <div className="grade">
        <img className="grade-icon" src={GRADE_ICONS[gradeLevel(record.cpm)]} alt="" />
        <div>「 {grade(record.cpm)} 」</div>
      </div>
      {isBest && (
        <p className="center new-best">
          <img className="inline-icon" src={DECO.sparkle} alt="" />
          <span className="blink-text">NEW RECORD</span>
          <img className="inline-icon" src={DECO.sparkle} alt="" />
        </p>
      )}
      {!isBest && previousBest !== null && <p className="center dim">최고 기록 {previousBest}타</p>}
      <div className="result-actions">
        <button onClick={onRetry}>[Enter] 다시 하기</button>
        <button onClick={onExit}>
          <img className="inline-icon" src={MENU_ICONS.home} alt="" />
          [ESC] 메뉴로
        </button>
      </div>
    </DosWindow>
  );
}
