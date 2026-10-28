"""위키문헌에서 저작권이 끝난 한국 단편소설을 받아 긴 글 연습용 데이터(src/data/novels.ts)를 만든다.

    python3 scripts/build_novels.py

- 위키 문법·구분선을 지우고, 괄호 속 한자는 뺀다 (한글 읽기가 바로 앞에 있다)
- 키보드로 치기 어려운 문장부호는 칠 수 있는 문자로 바꾼다
- 문단 단위로 약 PART_CHARS 글자씩 나눠 여러 편으로 만든다
"""

import json
import re
import urllib.parse
import urllib.request
from pathlib import Path

PART_CHARS = 1700
OUT = Path(__file__).resolve().parent.parent / 'src' / 'data' / 'novels.ts'

# (위키문헌 문서 제목, id 접두어, 표시 제목, 작가)
WORKS = [
    ('동백꽃', 'camellia', '동백꽃', '김유정'),
    ('봄봄', 'bombom', '봄봄', '김유정'),
    ('운수 좋은 날', 'lucky-day', '운수 좋은 날', '현진건'),
    ('B사감과 러브레터', 'b-sagam', 'B사감과 러브레터', '현진건'),
    ('메밀꽃 필 무렵', 'buckwheat', '메밀꽃 필 무렵', '이효석'),
    ('감자', 'potato', '감자', '김동인'),
]

REPLACE = {
    '“': '"', '”': '"', '‘': "'", '’': "'",
    '……': '...', '…': '...', '—': '-', '―': '-',
}


def fetch(title: str) -> str:
    query = urllib.parse.urlencode({'title': title, 'action': 'raw'})
    # 위키미디어는 기본 User-Agent를 막는다
    req = urllib.request.Request(
        f'https://ko.wikisource.org/w/index.php?{query}',
        headers={'User-Agent': 'nyanghachi-taja/0.1 (https://github.com/sabit1997/taja-for-nyanghachi)'},
    )
    with urllib.request.urlopen(req) as res:
        return res.read().decode('utf-8')


def clean(raw: str) -> list[str]:
    if not re.search(r'\{\{PD-old', raw):
        raise ValueError('저작권 만료 표시(PD-old)가 없다')
    text = re.sub(r'^\{\{머리말.*?\n\}\}', '', raw, flags=re.S)
    text = re.split(r'^=+\s*(라이선스|바깥 고리)\s*=+', text, flags=re.M)[0]
    text = re.sub(r'\{\{[^}]*\}\}', '', text)
    text = re.sub(r'</?(center|div)[^>]*>', '', text)
    text = re.sub(r'\[\[분류:[^\]]*\]\]', '', text)
    text = re.sub(r'[\U0001F650-\U0001F67F]', '', text)
    text = re.sub(r'\([一-鿿]+\)', '', text)
    for src, dst in REPLACE.items():
        text = text.replace(src, dst)
    paragraphs = [re.sub(r'\s+', ' ', p).strip() for p in text.split('\n')]
    paragraphs = [p for p in paragraphs if p]
    leftover = {c for p in paragraphs for c in p if not ('가' <= c <= '힣' or c.isascii())}
    if leftover:
        raise ValueError(f'칠 수 없는 문자가 남았다: {sorted(leftover)}')
    return paragraphs


def split_parts(paragraphs: list[str]) -> list[list[str]]:
    total = sum(len(p) for p in paragraphs)
    count = max(1, round(total / PART_CHARS))
    parts: list[list[str]] = [[] for _ in range(count)]
    seen = 0
    for p in paragraphs:
        parts[min(count - 1, int(seen / (total / count)))].append(p)
        seen += len(p)
    return [part for part in parts if part]


def main() -> None:
    entries = []
    for page, prefix, title, author in WORKS:
        parts = split_parts(clean(fetch(page)))
        for i, part in enumerate(parts, 1):
            entries.append({
                'id': f'{prefix}-{i}',
                'title': f'{title} ({i}/{len(parts)})',
                'author': author,
                'series': title,
                'body': '\n'.join(part),
            })
        print(f'{title}: {len(parts)}편, {sum(len(p) for part in parts for p in part)}자')

    lines = [
        '// scripts/build_novels.py 로 생성 — 직접 고치지 말 것',
        '// 출처: 한국어 위키문헌 (저작권 보호 기간 만료)',
        "import type { LongText } from './longTexts';",
        '',
        'export const NOVELS: LongText[] = ' + json.dumps(entries, ensure_ascii=False, indent=2) + ';',
        '',
    ]
    OUT.write_text('\n'.join(lines), encoding='utf-8')
    print(f'→ {OUT}')


if __name__ == '__main__':
    main()
