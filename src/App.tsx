import { useCallback, useEffect, useState } from 'react';
import { Help } from './components/Help';
import { StatusBar } from './components/StatusBar';
import { setSoundEnabled } from './lib/sound';
import { addRecord, loadRecords, loadSettings, saveSettings, type Mode, type PracticeRecord, type Settings } from './lib/storage';
import type { SessionSummary } from './lib/useTypingSession';
import { Game } from './game/Game';
import { Boot } from './screens/Boot';
import { KeyPractice } from './screens/KeyPractice';
import { LongPractice } from './screens/LongPractice';
import { Menu, type MenuTarget } from './screens/Menu';
import { Records } from './screens/Records';
import { Result } from './screens/Result';
import { SentencePractice } from './screens/SentencePractice';
import { SettingsScreen } from './screens/SettingsScreen';
import { WordPractice } from './screens/WordPractice';

type Screen =
  | { name: 'boot' | 'menu' | 'words' | 'sentences' | 'game' | 'records' | 'settings' }
  | { name: 'keys'; stageId?: string }
  | { name: 'long'; textId?: string }
  | { name: 'result'; record: PracticeRecord; previousBest: number | null; retryId?: string };

const HINTS: Record<Screen['name'], [string, string][]> = {
  boot: [['아무 키', '건너뛰기']],
  menu: [['↑↓', '이동'], ['Enter', '선택'], ['Tab', '한/영'], ['F1', '도움말']],
  keys: [['ESC', '뒤로'], ['F1', '도움말']],
  words: [['Space', '다음 낱말'], ['ESC', '그만하기'], ['F1', '도움말']],
  sentences: [['Enter', '다음 줄'], ['ESC', '그만하기'], ['F1', '도움말']],
  long: [['Enter', '다음 줄'], ['ESC', '그만하기'], ['F1', '도움말']],
  game: [],
  records: [['Tab', '한/영'], ['ESC', '뒤로']],
  settings: [['↑↓', '이동'], ['Enter', '켜기/끄기'], ['ESC', '뒤로']],
  result: [['Enter', '다시 하기'], ['ESC', '메뉴로']],
};

const LANG_TOGGLE_SCREENS = new Set<Screen['name']>(['menu', 'records']);

export function App() {
  const [settings, setSettings] = useState<Settings>(loadSettings);
  const [screen, setScreen] = useState<Screen>(() => (settings.boot ? { name: 'boot' } : { name: 'menu' }));
  const [lastMenu, setLastMenu] = useState<MenuTarget>('keys');
  const [help, setHelp] = useState(false);
  const { lang } = settings;

  const updateSettings = useCallback((next: Settings) => {
    setSettings(next);
    saveSettings(next);
  }, []);

  useEffect(() => setSoundEnabled(settings.sound), [settings.sound]);

  const toggleLang = () => updateSettings({ ...settings, lang: lang === 'ko' ? 'en' : 'ko' });
  const toMenu = useCallback(() => setScreen({ name: 'menu' }), []);

  // 도움말·언어 전환은 화면보다 먼저 가로챈다 (capture)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (help) {
        e.preventDefault();
        e.stopPropagation();
        setHelp(false);
        return;
      }
      if (e.key === 'F1') {
        e.preventDefault();
        e.stopPropagation();
        setHelp(true);
      } else if (e.key === 'Tab') {
        e.preventDefault();
        if (LANG_TOGGLE_SCREENS.has(screen.name)) {
          e.stopPropagation();
          updateSettings({ ...settings, lang: settings.lang === 'ko' ? 'en' : 'ko' });
        }
      }
    };
    window.addEventListener('keydown', onKey, true);
    return () => window.removeEventListener('keydown', onKey, true);
  }, [help, screen.name, settings, updateSettings]);

  /** detail: 단계·글 이름 (같은 detail끼리 최고 기록 비교), retryId: 다시 하기로 바로 들어갈 단계·글 id */
  const finish = (mode: Mode, summary: SessionSummary, sub?: { id: string; name: string }) => {
    const same = loadRecords().filter((r) => r.mode === mode && r.lang === lang && r.detail === sub?.name);
    const previousBest = same.length ? Math.max(...same.map((r) => r.cpm)) : null;
    const record: PracticeRecord = { mode, lang, ...summary, date: Date.now(), detail: sub?.name };
    addRecord(record);
    setScreen({ name: 'result', record, previousBest, retryId: sub?.id });
  };

  const retry = (s: Extract<Screen, { name: 'result' }>) => {
    const mode = s.record.mode;
    if (mode === 'keys') setScreen({ name: 'keys', stageId: s.retryId });
    else if (mode === 'long') setScreen({ name: 'long', textId: s.retryId });
    else setScreen({ name: mode });
  };

  const render = () => {
    switch (screen.name) {
      case 'boot':
        return <Boot onDone={toMenu} />;
      case 'menu':
        return (
          <Menu
            lang={lang}
            initial={lastMenu}
            onToggleLang={toggleLang}
            onSelect={(target) => {
              setLastMenu(target);
              setScreen(
                target === 'keys' ? { name: 'keys' } : target === 'long' ? { name: 'long' } : { name: target },
              );
            }}
          />
        );
      case 'keys':
        return (
          <KeyPractice
            lang={lang}
            initialStageId={screen.stageId}
            onExit={toMenu}
            onDone={(summary, stage) => finish('keys', summary, stage)}
          />
        );
      case 'long':
        return (
          <LongPractice
            lang={lang}
            initialTextId={screen.textId}
            onExit={toMenu}
            onDone={(summary, text) => finish('long', summary, { id: text.id, name: text.title })}
          />
        );
      case 'words':
        return <WordPractice lang={lang} onExit={toMenu} onDone={(s) => finish('words', s)} />;
      case 'sentences':
        return <SentencePractice lang={lang} onExit={toMenu} onDone={(s) => finish('sentences', s)} />;
      case 'game':
        return <Game lang={lang} onExit={toMenu} />;
      case 'records':
        return <Records lang={lang} onExit={toMenu} />;
      case 'settings':
        return <SettingsScreen settings={settings} onChange={updateSettings} onExit={toMenu} />;
      case 'result':
        return <Result record={screen.record} previousBest={screen.previousBest} onRetry={() => retry(screen)} onExit={toMenu} />;
    }
  };

  return (
    <div className={`app ${settings.crt ? 'crt' : ''}`}>
      <main className="screen" key={screen.name === 'result' ? screen.record.date : screen.name}>
        {render()}
      </main>
      {screen.name !== 'boot' && screen.name !== 'game' && <StatusBar hints={HINTS[screen.name]} lang={lang} />}
      {help && <Help />}
    </div>
  );
}
