import { isHangul } from '../lib/hangul';
import type { Lang } from '../lib/layout';

/** 연습 언어와 다른 입력기가 켜져 있으면 알려준다 */
export function LangHint({ lang, typed }: { lang: Lang; typed: string }) {
  const last = typed.trimEnd().slice(-1);
  if (!last) return null;
  const mismatch = lang === 'ko' ? /[a-zA-Z]/.test(last) : isHangul(last);
  if (!mismatch) return null;
  return (
    <p className="lang-hint">
      ▲ {lang === 'ko' ? '한/영 키를 눌러 한글 입력으로 바꿔주세요' : '한/영 키를 눌러 영문 입력으로 바꿔주세요'}
    </p>
  );
}
