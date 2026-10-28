import type { Lang } from '../lib/layout';

export interface LongText {
  id: string;
  title: string;
  author: string;
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
    {
      id: 'camellia-1',
      title: '동백꽃 (1/4)',
      author: '김유정',
      body: `오늘도 또 우리 수탉이 막 쫓기었다. 내가 점심을 먹고 나무를 하러 갈 양으로 나올 때이었다. 산으로 올라서려니까 등뒤에서 푸드득푸드득, 하고 닭의 횃소리가 야단이다. 깜짝 놀라서 고개를 돌려보니 아니나다르랴, 두 놈이 또 얼리었다.
점순네 수탉(은 대강이가 크고 똑 오소리같이 실팍하게 생긴 놈)이 덩저리 작은 우리 수탉을 함부로 해내는 것이다. 그것도 그냥 해내는 것이 아니라 푸드득하고 면두를 쪼고 물러섰다가 좀 사이를 두고 푸드득하고 모가지를 쪼았다. 이렇게 멋을 부려 가며 여지없이 닦아 놓는다. 그러면 이 못생긴 것은 쪼일 적마다 주둥이로 땅을 받으며 그 비명이 킥, 킥, 할 뿐이다. 물론 미처 아물지도 않은 면두를 또 쪼이며 붉은 선혈은 뚝뚝 떨어진다.
이걸 가만히 내려다보자니 내 대강이가 터져서 피가 흐르는 것같이 두 눈에서 불이 번쩍 난다. 대뜸 지게막대기를 메고 달려들어 점순네 닭을 후려칠까 하다가 생각을 고쳐먹고 헛매질로 떼어만 놓았다.
이번에도 점순이가 쌈을 붙여 놨을 것이다. 바짝바짝 내 기를 올리느라고 그랬음에 틀림없을 것이다. 고놈의 계집애가 요새로 들어서 왜 나를 못 먹겠다고 고렇게 아르릉거리는지 모른다.
나흘 전 감자 쪼간만 하더라도 나는 저에게 조금도 잘못한 것은 없다. 계집애가 나물을 캐러 가면 갔지 남 울타리 엮는 데 쌩이질을 하는 것은 다 뭐냐. 그것도 발소리를 죽여 가지고 등뒤로 살며시 와서,
"얘! 너 혼자만 일하니?"
하고 긴치 않는 수작을 하는 것이다.
어제까지도 저와 나는 이야기도 잘 않고 서로 만나도 본체 만 척하고 이렇게 점잖게 지내던 터이련만 오늘로 갑작스레 대견해졌음은 웬일인가. 항차 망아지만 한 계집애가 남 일하는 놈 보구.......
"그럼 혼자 하지 떼루 하디?"
내가 이렇게 내배앝는 소리를 하니까,
"너 일하기 좋니?"
또는,
"한여름이나 되거든 하지 벌써 울타리를 하니?"
잔소리를 두루 늘어놓다가 남이 들을까 봐 손으로 입을 틀어막고는 그 속에서 깔깔댄다. 별로 우스울 것도 없는데 날씨가 풀리더니 이 놈의 계집애가 미쳤나 하고 의심하였다. 게다가 조금 뒤에는 제 집께를 할금 할금 돌아보더니 행주치마의 속으로 꼈던 바른손을 뽑아서 나의 턱밑으로 불쑥 내미는 것이다. 언제 구웠는
지 더운 김이 홱 끼치는 굵은 감자 세 개가 손에 뿌듯이 쥐였다.
"느 집엔 이거 없지?"
하고 생색 있는 큰소리를 하고는 제가 준 것을 남이 알면은 큰일날 테니 여기서 얼른 먹어 버리란다. 그리고 또 하는 소리가,
"너 봄 감자가 맛있단다."
"난 감자 안 먹는다. 너나 먹어라."
나는 고개도 돌리지 않고 일하던 손으로 그 감자를 도로 어깨 너머로 쑥 밀어 버렸다. 그랬더니 그래도 가는 기색이 없고, 뿐만 아니라 쌔근쌔근하고 심상치 않게 숨소리가 점점 거칠어진다. 이건 또 뭐야 싶어서 그때에야 비로소 돌아다보니 나는 참으로 놀랐다. 우리가 이 동네에 들어온 것은 근 삼 년째 되어 오지만
여태껏 가무잡잡한 점순의의 얼굴이 이렇게까지 홍당무처럼 새빨개진 법이 없었다. 게다가 눈에 독을 올리고 한참 나를 요렇게 쏘아보더니 나중에는 눈물까지 어리는 것이 아니냐. 그리고 바구니를 다시 집어들더니 이를 꼭 악물고는 엎어질 듯 자빠질 듯 논둑으로 횡하게 달아나는 것이다.
어쩌다 동리 어른이,
"너 얼른 시집을 가야지?"
하고 웃으면,
"염려 마서유. 갈 때 되면 어련히 갈라구!"
이렇게 천연덕스레 받는 점순이었다. 본시 부끄럼을 타는 계집애도 아니거니와 또한 분하다고 눈에 눈물을 보일 얼병이도 아니다. 분하면 차라리 나의 등어리를 바구니로 한번 모질게 후려쌔리고 달아날지언정.`,
    },
    {
      id: 'camellia-2',
      title: '동백꽃 (2/4)',
      author: '김유정',
      body: `그런데 고약한 그 꼴을 하고 가더니 그 뒤로는 나를 보면 잡아먹으려 기를 복복 쓰는 것이다.
설혹 주는 감자를 안 받아먹는 것이 실례라 하면, 주면 그냥 주었지 '느 집엔 이거 없지.'는 다 뭐냐. 그렇잖아도 저희는 마름이고 우리는 그 손에서 배재를 얻어 땅을 부치므로 일상 굽실거린다. 우리가 이 마을에 처음 들어와 집이 없어서 곤란으로 지낼 제 집터를 빌리고 그 위에 집을 또 짓도록 마련해 준 것도 점순
네의 호의였다. 그리고 우리 어머니 아버지도 농사 때 양식이 딸리면 점순이네한테 가서 부지런히 꾸어다 먹으면서 인품 그런 집은 다시 없으리라고 침이 마르도록 칭찬하곤 하는 것이다. 그러면서도 열 일곱씩이나 된 것들이 수군수군하고 붙어 다니면 동네의 소문이 사납다고 주의를 시켜 준 것도 또 어머니였다. 왜냐하면 내가 점순이 하고 일을 저질렀다가는 점순네가 노할 것이고, 그러면 우리는 땅도 떨어지고 집도 내쫓기고 하지 않으면 안되는 까닭이었다.
그런데 이놈의 계집애가 까닭없이 기를 복복 쓰며 나를 말려 죽이려고 드는 것이다.
눈물을 흘리고 간 담날 저녁나절이었다. 나무를 한 짐 잔뜩 지고 산을 내려오려니까 어디서 닭이 죽는 소리를 친다. 이거 뉘집에서 닭을 잡나, 하고 점순네 울 뒤로 돌아오다가 나는 고만 두 눈이 똥그랬다. 점순이가 저희 집 봉당에 홀로 걸터앉았는데 이게 치마 앞에다 우리 씨암탉을 꼭 붙들어 놓고는,
"이놈의 씨닭! 죽어라 죽어라."
요렇게 암팡스레 패 주는 것이 아닌가. 그것도 대가리나 치면 모른다마는 아주 알도 못 낳으라고 그 볼기짝께를 주먹으로 콕콕 쥐어박는 것이다.
나는 눈에 쌍심지가 오르고 사지가 부르르 떨렸으나 사방을 한번 휘둘러보고야 그제서야 점순이 집에 아무도 없음을 알았다. 잡은 참 지게 막대기를 들어 울타리의 중턱을 후려치며,
"이놈의 계집애! 남의 닭 알 못 낳으라구 그러니?"
하고 소리를 빽 질렀다.
그러나 점순이는 조금도 놀라는 기색이 없고 그대로 의젓이 앉아서 제 닭 가지고 하듯이 또 죽어라,죽어라, 하고 패는 것이다. 이걸 보면 내가 산에서 내려올 때를 겨냥해 가지고 미리부터 닭을 잡아가지고 있다가 네 보라는 듯이 내 앞에서 줴지르고 있음이 확실하다.
그러나 나는 그렇다고 남의 집에 뛰어들어가 계집애하고 싸울 수도 없는 노릇이고 형편이 썩 불리함을 알았다. 그래 닭이 맞을 적마다 지게 막대기로 울타리를 후려칠 수밖에 별 도리가 없다. 왜냐하면 울타리를 치면 칠수록 울섶이 물러앉으며 뼈대만 남기 때문이다. 허나 아무리 생각하여도 나만 밑지는 노릇이다.
"아, 이년아! 남의 닭 아주 죽일 터이야?"
내가 도끼눈을 뜨고 다시 꽥 호령을 하니까 그제서야 울타리께로 쪼르르 오더니 울 밖에 섰는 나의 머리를 겨누고 닭을 내팽개친다.
"에이 더럽다! 더럽다!"
"더러운 걸 널더러 입때 끼고 있으랬니? 망할 계집애년 같으니"
하고 나도 더럽단 듯이 울타리께를 횡허케 돌아내리며 약이 오를 대로 다 올랐다, 라고 하는 것은 암탉이 풍기는 서슬에 나의 이마빼기에다 물지똥을 찍 갈겼는데 그걸 본다면 알집만 터졌을 뿐 아니라 골병은 단단히 든 듯싶다. 그리고 나의 등 뒤를 향하여 나에게만 들릴 듯 말 듯한 음성으로,
"이 바보 녀석아!"
"애! 너 배냇병신이지?"
그만도 좋으련만,
"얘! 너 느 아버지가 고자라지?"
"뭐 울아버지가 그래 고자야?"
할 양으로 열벙거지가 나서 고개를 홱 돌리어 바라봤더니 그때까지 울타리 위로 나와 있어야 할 점순이의 대가리가 어디 갔는지 보이지를 않는다. 그러다 돌아서서 오자면 아까에 한 욕을 울 밖으로 또 퍼붓는 것이다. 욕을 이토록 먹어 가면서도 대거리 한 마디 못하는 걸 생각하니 돌부리에 채이어 발톱 밑이 터지는 것도 모를 만큼 분하고 급기야는 두 눈에 눈물까지 불끈 내솟는다.`,
    },
    {
      id: 'camellia-3',
      title: '동백꽃 (3/4)',
      author: '김유정',
      body: `그러나 점순이의 침해는 이것뿐이 아니다.
닭벼슬을 좋아한다면서도 사람들이 없으면 틈틈이 제 집 수탉을 몰고 와서 우리 수탉과 쌈을 붙여 놓는다. 제 집 수탉은 썩 험상궂게 생기고 쌈이라면 홰를 치는 고로 으레 이길 것을 알기 때문이다. 그래서 툭하면 우리 수탉이 면두며 눈깔이 피로 흐드르하게 되도록 해 놓는다. 어떤 때에는 우리 수탉이 나오지를 않으니까 요놈의 계집애가 모이를 쥐고 와서 꾀어내다가 쌈을 붙인다.
이렇게 되면 나도 다른 배차를 차리지 않을 수 없었다. 하루는 우리 수탉을 붙들어 가지고 넌지시 장독께로 갔다. 쌈닭에게 고추장을 먹이면 병든 황소가 살모사를 먹고 용을 쓰는 것처럼 기운이 뻗친다 한다. 장독에서 고추장 한 접시를 떠서 닭 주둥아리께로 들여 밀고 먹여 보았다. 닭도 고추장에 맛을 들였는지 거스르지 않고 거진 반 접시 턱이나 곧잘 먹는다. 그리고 먹고 금시는 용을 못쓸 터이므로 얼마쯤 기운이 돌도록 횃속에다 가두어 두었다.
밭에 두엄을 두어 짐 져내고 나서 쉴 참에 그 닭을 안고 밖으로 나왔다. 마침 밖에는 아무도 없고 점순이만 저희 울안에서 헌옷을 뜯는지 혹은 솜을 터는지 웅크리고 앉아서 일을 할 뿐이다.
나는 점순네 수탉이 노는 밭으로 가서 닭을 내려놓고  가만히 맥을 보았다. 두 닭은 여전히 얼리어 쌈을 하는데 처음에는 아무 보람이 없었다. 멋지게 쪼는 바람에 우리 닭은 또 피를 흘리고 그러면서도 날갯죽지만 푸드득푸드득하고 올라 뛰고 뛰고 할뿐으로 제법 한번 쪼아 보지도 못한다.
그러나 한번엔 어쩐 일인지 용을 쓰고 펄쩍 뛰더니 발톱으로 눈을 하비고 내려오며 면두를 쪼았다. 큰 닭도 여기에는 놀랐는지 뒤로 멈씰하며 물러난다. 이 기회를 타서 작은 우리 수탉이 또 날쌔게 덤벼들어 다시 면두를 쪼니 그제서는 감때사나운 그 대강이에서도 피가 흐르지 않을 수 없다.
옳다 알았다, 고추장만 먹이며는 되는구나 하고 나는 속으로 아주 쟁그러워 죽겠다. 그때에는 뜻밖에 내가 닭쌈을 붙여 놓는 데 놀라서 울 밖으로 내다보고 섰던 점순이도 입맛이 쓴지 눈쌀을 찌푸렸다.
나는 두 손으로 볼기짝을 두드리며 연방,
"잘한다! 잘한다!"하고, 신이 머리끝까지 뻐치었다.
그러나 얼마 되지 않아서 나는 넋이 풀리어 기둥같이 묵묵히 서 있게 되었다. 왜냐하면 큰 닭이 한번 쪼인 앙갚음으로 호들갑스레 연거푸 쪼는 서슬에 우리 수탉은 찔끔 못하고 막 곯는다. 이걸 보고서 이번에는 점순이가 깔깔거리고 되도록 이쪽에서 많이 들으라고 웃는 것이다.
나는 보다 못하여 덤벼들어서 우리 수탉을 붙들어 가지고 도로 집으로 들어왔다. 고추장을 좀더 먹였더라면 좋았을 걸, 너무 급하게 쌈을 붙인 것이 퍽 후회가 난다. 장독께로 돌아와서 다시 턱밑에 고추장을 들이댔다. 흥분으로 말미암아 그런지 당최 먹질 않는다.
나는 하릴없이 닭을 반듯이 눕히고 그 입에다 궐련 물부리를 물리었다. 그리고 고추장물을 타서 그 구멍으로 조금씩 들여 부었다. 닭은 좀 괴로운지 킥킥하고 재채기를 하는 모양이나 그러나 당장의 괴로움은 매일 같이 피를 흘리는 데 댈 게 아니라 생각하였다.
그러나 한 두어 종지 가량 고추장물 먹이고 나서는 나는 고만 풀이 죽었다. 싱싱하던 닭이 왜 그런지 고개를 살며시 뒤틀고는 손아귀에서 뻐드러지는 것이 아닌가. 아버지가 볼까 봐서 얼른 홰에다 감추어 두었더니 오늘 아침에서야 겨우 정신이 든 모양 같다.`,
    },
    {
      id: 'camellia-4',
      title: '동백꽃 (4/4)',
      author: '김유정',
      body: `그랬던 걸 이렇게 오다 보니까 또 쌈을 붙여 놓으니 이 망할 계집애가 필연 우리 집에 아무도 없는 틈을 타서 제가 들어와 홰에서 꺼내 가지고 나간 것이 분명하다.
나는 다시 닭을 잡아다 가두고 염려는 스러우나 그렇다고 산으로 나무를 하러 가지 않을 수도 없는 형편이었다.
소나무 삭정이를 따며 가만히 생각해 보니 암만해도 고년의 목쟁이를 돌려놓고 싶다. 이번에 내려가면 망할 년 등줄기를 한번 되게 후려치겠다 하고 싱둥겅둥 나무를 지고는 부리나케 내려왔다.
거지반 집에 다 내려와서 나는 호드기 소리를 듣고 발이 딱 멈추었다. 산기슭에 널려 있는 굵은 바윗돌 틈에 노란 동백꽃이 소보록하니 깔리었다. 그 틈에 끼어 앉아서 점순이가 청승맞게시리 호드기를 불고 있는 것이다. 그보다도 더 놀란 것은 고 앞에서 또 푸드득, 푸드득, 하고 들리는 닭의 횃소리다. 필연코 요년이
나의 약을 올리느라고 또 닭을 집어내다가 내가 내려올 길목에다 쌈을 시켜 놓고 저는 그 앞에 앉아서 천연스레 호드기를 불고 있음에 틀림없으리라.
나는 약이 오를 대로 올라서 두 눈에서 불과 함께 눈물이 퍽 쏟아졌다. 나뭇지게도 벗어 놀 새 없이 그대로 내동댕이치고는 지게 막대기를 뻗치고 허둥허둥 달려들었다.
가까이 와 보니 과연 나의 짐작대로 우리 수탉이 피를 흘리고 거의 빈사지경에 이르렀다. 닭도 닭이려니와 그러함에도 불구하고 눈 하나 깜짝 없이 고대로 앉아서 호드기만 부는 그 꼴에 더욱 치가 떨린다. 동네에서도 소문이 났거니와 나도 한때는 걱실걱실히 일 잘 하고 얼굴 예쁜 계집애인 줄 알았더니 시방 보니까 그 눈깔이 꼭 여우새끼 같다.
나는 대뜸 달려들어서 나도 모르는 사이에 큰 수탉을 단매로 때려 엎었다. 닭은 푹 엎어진 채 다리 하나 꼼짝 못 하고 그대로 죽어 버렸다. 그리고 나는 멍하니 섰다가 점순이가 매섭게 눈을 홉뜨고 닥치는 바람에 뒤로 벌렁 나자빠졌다.
"이놈아! 너 왜 남의 닭을 때려죽이니?"
"그럼 어때?"
하고 일어나다가,
"뭐 이 자식아! 누 집 닭인데?"
하고 복장을 떼미는 바람에 다시 벌렁 자빠졌다. 그리고 나서 가만히 생각을 하니 분하기도 하고 무안도스럽고, 또 한편 일을 저질렀으니, 인젠 땅이 떨어지고 집도 내쫓기고 해야 될는지 모른다.
나는 비슬비슬 일어나며 소맷자락으로 눈을 가리고는, 얼김에 엉 하고 울음을 놓았다. 그러나 점순이가 앞으로 다가와서,
"그럼 너 이담부텀 안 그럴 테냐?"
하고 물을 때에야 비로소 살길을 찾은 듯싶었다. 나는 눈물을 우선 씻고 뭘 안 그러는지 명색도 모르건만,
"그래!"
하고 무턱대고 대답하였다.
"요담부터 또 그래 봐라, 내 자꾸 못살게 굴 테니."
"그래 그래 이젠 안 그럴 테야!"
"닭 죽은 건 염려 마라, 내 안 이를 테니."
그리고 뭣에 떠다밀렸는지 나의 어깨를 짚은 채 그대로 퍽 쓰러진다. 그 바람에 나의 몸뚱이도 겹쳐서 쓰러지며, 한창 피어 퍼드러진 노란 동백꽃 속으로 폭 파묻혀 버렸다.
알싸한, 그리고 향긋한 그 냄새에 나는 땅이 꺼지는 듯이 온 정신이 고만 아찔하였다.
"너 말 마라!"
"그래!"
조금 있더니 요 아래서,
"점순아! 점순아! 이년이 바느질을 하다 말구 어딜 갔어?"
하고 어딜 갔다 온 듯싶은 그 어머니가 역정이 대단히 났다.
점순이가 겁을 잔뜩 집어먹고 꽃밑을 살금살금 기어서 산알로 내려간 다음 나는 바위를 끼고 엉금엉금 기어서 산 위로 치빼지 않을 수 없었다.`,
    },
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
