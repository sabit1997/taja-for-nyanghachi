// 픽셀 아이콘 — '네온 픽셀 아이콘 디자인 보드'에서 추출
import menuHome from './icons/menu-home.png';
import menuWords from './icons/menu-community.png';
import menuSentences from './icons/menu-practice.png';
import menuRecords from './icons/menu-records.png';
import menuSettings from './icons/menu-settings.png';
import grade1 from './icons/grade-1-bronze.png';
import grade2 from './icons/grade-2-silver.png';
import grade3 from './icons/grade-3-gold.png';
import grade4 from './icons/grade-4-platinum.png';
import grade5 from './icons/grade-5-diamond.png';
import grade6 from './icons/grade-6-master.png';
import hands1 from './icons/hands-1.png';
import hands2 from './icons/hands-2.png';
import hands3 from './icons/hands-3.png';
import hands4 from './icons/hands-4.png';
import hands5 from './icons/hands-5.png';
import hands6 from './icons/hands-6.png';
import decoMoon from './icons/deco-moon.png';
import decoPlanet from './icons/deco-planet.png';
import decoSparkle from './icons/deco-sparkle.png';
import decoPaw from './icons/deco-paw-purple.png';

export const MENU_ICONS = {
  keys: hands1,
  words: menuWords,
  sentences: menuSentences,
  records: menuRecords,
  settings: menuSettings,
  home: menuHome,
};

/** 등급 순서대로 (브론즈 → 마스터) */
export const GRADE_ICONS = [grade1, grade2, grade3, grade4, grade5, grade6];

/** 0: 대기, 1~4: 타이핑, 5: 완료 */
export const HAND_FRAMES = [hands1, hands2, hands3, hands4, hands5, hands6];

export const DECO = { moon: decoMoon, planet: decoPlanet, sparkle: decoSparkle, paw: decoPaw };
