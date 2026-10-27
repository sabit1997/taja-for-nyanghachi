import { useMemo } from 'react';
import { DosWindow } from '../components/DosWindow';
import { bar, formatDate } from '../lib/format';
import { useKeydown } from '../lib/hooks';
import type { Lang } from '../lib/layout';
import { MODE_NAMES, loadRecords, type Mode } from '../lib/storage';

const MODES: Mode[] = ['keys', 'words', 'sentences'];

export function Records({ lang, onExit }: { lang: Lang; onExit: () => void }) {
  const records = useMemo(() => loadRecords().filter((r) => r.lang === lang), [lang]);
  const recent = records.slice(-10).reverse();
  const maxCpm = Math.max(100, ...recent.map((r) => r.cpm));

  useKeydown((e) => {
    if (e.key === 'Escape') onExit();
  });

  return (
    <DosWindow title={`기록 보기 · ${lang === 'ko' ? '한글' : 'English'}`}>
      <table className="records-table">
        <thead>
          <tr>
            <th>모드</th>
            <th>횟수</th>
            <th>최고 타수</th>
            <th>평균 타수</th>
            <th>평균 정확도</th>
          </tr>
        </thead>
        <tbody>
          {MODES.map((mode) => {
            const rows = records.filter((r) => r.mode === mode);
            const avg = (pick: (n: (typeof rows)[number]) => number) =>
              rows.length ? Math.round(rows.reduce((sum, r) => sum + pick(r), 0) / rows.length) : null;
            return (
              <tr key={mode}>
                <td>{MODE_NAMES[mode]}</td>
                <td>{rows.length}</td>
                <td className="hl">{rows.length ? Math.max(...rows.map((r) => r.cpm)) : '-'}</td>
                <td>{avg((r) => r.cpm) ?? '-'}</td>
                <td>{rows.length ? `${avg((r) => r.accuracy)}%` : '-'}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <h2 className="section-title">최근 10회</h2>
      {recent.length === 0 ? (
        <p className="dim">아직 기록이 없어요. 연습을 한 판 해보세요!</p>
      ) : (
        <div className="recent">
          {recent.map((r) => (
            <div key={r.date} className="recent-row">
              <span className="dim">{formatDate(r.date)}</span>
              <span className="recent-mode">{MODE_NAMES[r.mode]}</span>
              <span className="recent-bar">{bar(r.cpm / maxCpm, 24)}</span>
              <span className="hl">{r.cpm}타</span>
              <span className="dim">{r.accuracy}%</span>
            </div>
          ))}
        </div>
      )}
      <p className="dim">Tab 키로 한글/English 기록을 바꿔 볼 수 있어요.</p>
    </DosWindow>
  );
}
