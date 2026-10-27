import type { Lang } from '../lib/layout';

export const WORDS: Record<Lang, string[]> = {
  ko: [
    '컴퓨터', '키보드', '모니터', '자판', '연습', '타자', '하늘', '바다', '나무', '사람',
    '학교', '친구', '가방', '연필', '공책', '사과', '포도', '딸기', '수박', '김밥',
    '라면', '떡볶이', '우산', '신발', '시계', '전화', '사진', '노래', '그림', '편지',
    '창문', '마당', '고양이', '강아지', '토끼', '거북이', '다람쥐', '호랑이', '코끼리', '병아리',
    '봄비', '여름', '가을', '겨울', '눈사람', '무지개', '구름', '햇살', '바람', '별빛',
    '도서관', '운동장', '놀이터', '자전거', '기차', '비행기', '우주선', '로봇', '게임', '음악',
    '읽기', '쓰기', '맑음', '흙길', '닭고기', '짧은글', '괜찮아', '왜냐면', '꿈나무', '씨앗',
  ],
  en: [
    'computer', 'keyboard', 'monitor', 'floppy', 'disk', 'memory', 'pixel', 'screen', 'cursor', 'program',
    'basic', 'modem', 'arcade', 'joystick', 'sound', 'music', 'retro', 'binary', 'byte', 'chip',
    'apple', 'banana', 'orange', 'river', 'mountain', 'ocean', 'forest', 'garden', 'window', 'school',
    'friend', 'pencil', 'paper', 'letter', 'number', 'random', 'little', 'yellow', 'purple', 'silver',
    'jump', 'quick', 'brown', 'lazy', 'zebra', 'quiet', 'wizard', 'oxygen', 'puzzle', 'jacket',
    'spring', 'summer', 'autumn', 'winter', 'rainbow', 'cloud', 'thunder', 'planet', 'rocket', 'galaxy',
  ],
};

export const SENTENCES: Record<Lang, string[]> = {
  ko: [
    '가는 말이 고와야 오는 말이 곱다.',
    '낮말은 새가 듣고 밤말은 쥐가 듣는다.',
    '천 리 길도 한 걸음부터.',
    '백지장도 맞들면 낫다.',
    '세 살 버릇 여든까지 간다.',
    '티끌 모아 태산.',
    '원숭이도 나무에서 떨어진다.',
    '구슬이 서 말이라도 꿰어야 보배다.',
    '고래 싸움에 새우 등 터진다.',
    '돌다리도 두들겨 보고 건너라.',
    '소 잃고 외양간 고친다.',
    '하늘이 무너져도 솟아날 구멍이 있다.',
    '동해 물과 백두산이 마르고 닳도록',
    '하느님이 보우하사 우리나라 만세',
    '무궁화 삼천리 화려 강산',
    '대한 사람 대한으로 길이 보전하세',
    '빈 수레가 요란하다.',
    '배보다 배꼽이 더 크다.',
    '등잔 밑이 어둡다.',
    '말 한마디로 천 냥 빚을 갚는다.',
    '우물을 파도 한 우물을 파라.',
    '시작이 반이다.',
    '아는 길도 물어 가라.',
    '콩 심은 데 콩 나고 팥 심은 데 팥 난다.',
  ],
  en: [
    'The quick brown fox jumps over the lazy dog.',
    'Pack my box with five dozen liquor jugs.',
    'How vexingly quick daft zebras jump!',
    'Sphinx of black quartz, judge my vow.',
    'A journey of a thousand miles begins with a single step.',
    'Practice makes perfect.',
    'Where there is a will, there is a way.',
    'The early bird catches the worm.',
    'Actions speak louder than words.',
    'Knowledge is power.',
    'Rome was not built in a day.',
    'All that glitters is not gold.',
    'Better late than never.',
    'Time flies like an arrow.',
    'Every cloud has a silver lining.',
    'Slow and steady wins the race.',
    'Do not count your chickens before they hatch.',
    'When in Rome, do as the Romans do.',
    'An apple a day keeps the doctor away.',
    'Two heads are better than one.',
  ],
};

export function pickRandom<T>(items: T[], count: number): T[] {
  const pool = [...items];
  const picked: T[] = [];
  while (picked.length < count && pool.length > 0) {
    picked.push(pool.splice(Math.floor(Math.random() * pool.length), 1)[0]);
  }
  return picked;
}
