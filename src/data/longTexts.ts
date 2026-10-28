import type { Lang } from '../lib/layout';
import { NOVELS } from './novels';

export interface LongText {
  id: string;
  title: string;
  author: string;
  /** 여러 편으로 나눈 작품이면 작품 이름 (목록에서 한 줄로 묶는다) */
  series?: string;
  /** 줄바꿈으로 나눈 원문. 빈 줄(연 구분)은 연습에서 건너뛴다 */
  body: string;
}

// 저작권 보호 기간이 끝난 글만 싣는다
export const LONG_TEXTS: Record<Lang, LongText[]> = {
  ko: [
    {
      id: 'aegukga',
      title: '애국가',
      author: '작자 미상',
      body: `동해 물과 백두산이 마르고 닳도록
하느님이 보우하사 우리나라 만세
무궁화 삼천리 화려 강산
대한 사람 대한으로 길이 보전하세
남산 위에 저 소나무 철갑을 두른 듯
바람 서리 불변함은 우리 기상일세
가을 하늘 공활한데 높고 구름 없이
밝은 달은 우리 가슴 일편단심일세
이 기상과 이 맘으로 충성을 다하여
괴로우나 즐거우나 나라 사랑하세
무궁화 삼천리 화려 강산
대한 사람 대한으로 길이 보전하세`,
    },
    {
      id: 'seosi',
      title: '서시',
      author: '윤동주',
      body: `죽는 날까지 하늘을 우러러
한 점 부끄럼이 없기를,
잎새에 이는 바람에도
나는 괴로워했다.
별을 노래하는 마음으로
모든 죽어 가는 것을 사랑해야지
그리고 나한테 주어진 길을
걸어가야겠다.

오늘 밤에도 별이 바람에 스치운다.`,
    },
    {
      id: 'azalea',
      title: '진달래꽃',
      author: '김소월',
      body: `나 보기가 역겨워
가실 때에는
말없이 고이 보내 드리우리다

영변에 약산
진달래꽃
아름 따다 가실 길에 뿌리우리다

가시는 걸음걸음
놓인 그 꽃을
사뿐히 즈려밟고 가시옵소서

나 보기가 역겨워
가실 때에는
죽어도 아니 눈물 흘리우리다`,
    },
    {
      id: 'silence',
      title: '님의 침묵',
      author: '한용운',
      body: `님은 갔습니다. 아아, 사랑하는 나의 님은 갔습니다.
푸른 산빛을 깨치고 단풍나무 숲을 향하여 난 작은 길을 걸어서, 차마 떨치고 갔습니다.
황금의 꽃같이 굳고 빛나던 옛 맹세는 차디찬 티끌이 되어서 한숨의 미풍에 날아갔습니다.
날카로운 첫 키스의 추억은 나의 운명의 지침을 돌려놓고, 뒷걸음쳐서 사라졌습니다.
나는 향기로운 님의 말소리에 귀먹고, 꽃다운 님의 얼굴에 눈멀었습니다.
사랑도 사람의 일이라, 만날 때에 미리 떠날 것을 염려하고 경계하지 아니한 것은 아니지만, 이별은 뜻밖의 일이 되고, 놀란 가슴은 새로운 슬픔에 터집니다.
그러나 이별을 쓸데없는 눈물의 원천을 만들고 마는 것은 스스로 사랑을 깨치는 것인 줄 아는 까닭에, 걷잡을 수 없는 슬픔의 힘을 옮겨서 새 희망의 정수박이에 들어부었습니다.
우리는 만날 때에 떠날 것을 염려하는 것과 같이, 떠날 때에 다시 만날 것을 믿습니다.
아아, 님은 갔지마는 나는 님을 보내지 아니하였습니다.
제 곡조를 못 이기는 사랑의 노래는 님의 침묵을 휩싸고 돕니다.`,
    },
    {
      id: 'riverside',
      title: '엄마야 누나야',
      author: '김소월',
      body: `엄마야 누나야 강변 살자
뜰에는 반짝이는 금모래 빛
뒷문 밖에는 갈잎의 노래
엄마야 누나야 강변 살자`,
    },
    ...NOVELS,
    {
      id: 'lab-1995',
      title: '냥하치와 1995년 컴퓨터실',
      author: 'Claude (창작)',
      body: `1995년 겨울, 학교 컴퓨터실에는 파란 화면이 줄지어 켜져 있었다.
아이들이 모두 집에 간 저녁, 열린 창틈으로 작은 고양이 한 마리가 넘어 들어왔다.
고양이의 이름은 냥하치였다. 목에는 누군가 매어 준 보라색 방울이 달려 있었다.
냥하치는 따뜻한 모니터 위에 올라앉아 깜빡이는 커서를 한참 바라보았다.
커서는 무언가를 기다리는 것처럼 같은 자리에서 쉬지 않고 깜빡였다.
냥하치가 조심스럽게 앞발을 키보드에 올리자 화면에 글자 하나가 나타났다.
그것은 냥하치가 세상에 처음 남긴 글자였다.
신이 난 냥하치는 이 자판 저 자판을 꾹꾹 눌렀다. 삑, 삑, 소리가 날 때마다 글자가 하나씩 늘어났다.
다음 날 아침, 선생님은 화면 가득한 이상한 글자들을 보고 고개를 갸웃했다.
"누가 밤새 타자 연습을 했지?"
창밖 담장 위에서 냥하치는 모른 척 하품을 했다.
그날 밤에도, 그다음 날 밤에도 컴퓨터실의 파란 화면은 조용히 냥하치를 기다렸다.`,
    },
    {
      id: 'fish-thief',
      title: '생선 도둑 외계인',
      author: 'Claude (창작)',
      body: `어느 날 밤, 동네 생선 가게의 생선이 모조리 사라졌다.
범인은 하늘 위에 둥실 떠 있는 작은 초록색 외계인들이었다.
지구의 생선이 우주에서 가장 맛있다는 소문을 듣고 멀리서 찾아온 것이었다.
배낭을 멘 고양이 냥하치는 그 소식을 듣고 수염을 바르르 떨었다.
"생선은 고양이의 것이야. 아무리 외계인이라도 그냥 둘 수는 없지."
냥하치는 배낭에 생선 열 마리를 챙겨 넣고 뒷산 꼭대기로 올라갔다.
외계인들은 둥근 우주선을 타고 냥하치의 머리 위를 빙글빙글 돌았다.
냥하치가 정확하게 생선을 던질 때마다 우주선은 휘청거리며 멀리 물러났다.
마지막으로 거대한 마스터 우주선이 나타나 밤하늘을 가득 덮었다.
냥하치는 숨을 고르고 남은 생선 한 마리를 힘껏 던졌다.
우주선은 반짝이는 별가루를 뿌리며 우주 저편으로 사라졌다.
그 뒤로 외계인들은 생선을 훔치는 대신, 정중하게 편지를 보내 생선을 사 가게 되었다.`,
    },
    {
      id: 'cat-post',
      title: '비 오는 날의 고양이 우체국',
      author: 'Claude (창작)',
      body: `비가 오는 날이면 골목 끝 빨간 우체통 옆에 작은 우체국이 문을 연다.
우체국장은 회색 털에 파란 손수건을 두른 고양이다.
이 우체국에서는 사람에게 차마 하지 못한 말들을 편지로 부쳐 준다.
미안하다는 말, 고마웠다는 말, 보고 싶다는 말이 매일 조금씩 쌓인다.
우체국장은 편지를 한 통 한 통 꼼꼼히 읽고, 받는 사람의 꿈속으로 배달한다.
어떤 편지는 하룻밤 만에 닿고, 어떤 편지는 몇 년이 걸리기도 한다.
그래도 우체국장은 단 한 통의 편지도 잃어버린 적이 없다.
"마음은 아무리 멀어도 결국 도착해요. 조금 늦을 뿐이지요."
오늘도 비가 내린다. 우체통 옆 작은 창문에는 노란 불빛이 켜져 있다.
혹시 당신에게도 부치지 못한 편지가 있다면, 비 오는 날 그 골목을 찾아가 보길.`,
    },
  ],
  en: [
    {
      id: 'gettysburg',
      title: 'Gettysburg Address',
      author: 'Abraham Lincoln',
      body: `Four score and seven years ago our fathers brought forth on this continent, a new nation, conceived in Liberty, and dedicated to the proposition that all men are created equal.
Now we are engaged in a great civil war, testing whether that nation, or any nation so conceived and so dedicated, can long endure. We are met on a great battle-field of that war. We have come to dedicate a portion of that field, as a final resting place for those who here gave their lives that that nation might live. It is altogether fitting and proper that we should do this.`,
    },
    {
      id: 'sonnet18',
      title: 'Sonnet 18',
      author: 'William Shakespeare',
      body: `Shall I compare thee to a summer's day?
Thou art more lovely and more temperate:
Rough winds do shake the darling buds of May,
And summer's lease hath all too short a date;
Sometime too hot the eye of heaven shines,
And often is his gold complexion dimm'd;
And every fair from fair sometime declines,
By chance or nature's changing course untrimm'd;
But thy eternal summer shall not fade,
Nor lose possession of that fair thou ow'st;
Nor shall Death brag thou wander'st in his shade,
When in eternal lines to time thou grow'st:
So long as men can breathe or eyes can see,
So long lives this, and this gives life to thee.`,
    },
    {
      id: 'road',
      title: 'The Road Not Taken',
      author: 'Robert Frost',
      body: `Two roads diverged in a yellow wood,
And sorry I could not travel both
And be one traveler, long I stood
And looked down one as far as I could
To where it bent in the undergrowth;

Then took the other, as just as fair,
And having perhaps the better claim,
Because it was grassy and wanted wear;
Though as for that the passing there
Had worn them really about the same,

And both that morning equally lay
In leaves no step had trodden black.
Oh, I kept the first for another day!
Yet knowing how way leads on to way,
I doubted if I should ever come back.

I shall be telling this with a sigh
Somewhere ages and ages hence:
Two roads diverged in a wood, and I -
I took the one less traveled by,
And that has made all the difference.`,
    },
    {
      id: 'alice',
      title: "Alice's Adventures in Wonderland",
      author: 'Lewis Carroll',
      body: `Alice was beginning to get very tired of sitting by her sister on the bank, and of having nothing to do: once or twice she had peeped into the book her sister was reading, but it had no pictures or conversations in it, "and what is the use of a book," thought Alice "without pictures or conversations?"`,
    },
    {
      id: 'hope',
      title: '"Hope" is the thing with feathers',
      author: 'Emily Dickinson',
      body: `"Hope" is the thing with feathers -
That perches in the soul -
And sings the tune without the words -
And never stops - at all -

And sweetest - in the Gale - is heard -
And sore must be the storm -
That could abash the little Bird
That kept so many warm -

I've heard it in the chillest land -
And on the strangest Sea -
Yet - never - in Extremity,
It asked a crumb - of me.`,
    },
    {
      id: 'lab-night',
      title: 'The Night the Computer Lab Meowed',
      author: 'Claude (original)',
      body: `In the winter of 1995, the school computer lab glowed with rows of blue screens.
After the last student went home, a small cat slipped in through an open window.
Her name was Nyanghachi, and she wore a purple bell around her neck.
She curled up on top of a warm monitor and watched the cursor blink, blink, blink.
It seemed to be waiting for someone.
Very carefully, she stepped onto the keyboard, and a single letter appeared on the screen.
It was the first letter she had ever written, and it was perfect.
By morning the screen was full of strange letters, and the teacher scratched his head.
"Who was practicing their typing all night?"
Outside, on the fence, a small cat yawned and pretended not to know.`,
    },
    {
      id: 'moon-letter',
      title: 'A Letter from the Moon Fortress',
      author: 'Claude (original)',
      body: `Dear Earth,
We are writing to apologize for the fish.
We heard that your fish were the most delicious food in the galaxy, and we could not resist.
We did not expect a cat with a backpack to defend them so bravely.
Our captain says her aim was the best he has ever seen.
We have returned to our fortress on the moon, and we have learned our lesson.
From now on, we will pay for every fish with shiny stardust.
Please tell the cat that we are sorry, and that we would like to be friends.
Yours sincerely,
The Green Aliens`,
    },
  ],
};

export interface Work {
  key: string;
  title: string;
  author: string;
  parts: LongText[];
}

/** 여러 편으로 나뉜 글을 작품 하나로 묶는다 (순서 유지) */
export function groupWorks(texts: LongText[]): Work[] {
  const works: Work[] = [];
  for (const text of texts) {
    const key = text.series ?? text.id;
    const work = works.find((w) => w.key === key);
    if (work) work.parts.push(text);
    else works.push({ key, title: text.series ?? text.title, author: text.author, parts: [text] });
  }
  return works;
}

/** 한 줄 최대 글자 수 — 화면 폭에 맞춘 값 */
export const LINE_WIDTH: Record<Lang, number> = { ko: 30, en: 56 };

/** 빈 줄을 빼고, 너무 긴 줄은 띄어쓰기 기준으로 나눈다 */
export function toLines(body: string, maxLength: number): string[] {
  const lines: string[] = [];
  for (const raw of body.split('\n')) {
    const paragraph = raw.trim();
    if (!paragraph) continue;
    let current = '';
    for (const word of paragraph.split(/\s+/)) {
      const next = current ? `${current} ${word}` : word;
      if (next.length > maxLength && current) {
        lines.push(current);
        current = word;
      } else {
        current = next;
      }
    }
    if (current) lines.push(current);
  }
  return lines;
}
