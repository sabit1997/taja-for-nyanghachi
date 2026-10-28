import { DosWindow } from './DosWindow';

const KEYS: [string, string][] = [
  ['↑ ↓', '메뉴 이동'],
  ['Enter', '선택 / 다음 줄'],
  ['1 ~ 7', '메뉴 바로 가기'],
  ['Tab', '한글 ↔ 영어 전환 (메뉴 화면)'],
  ['Space', '낱말 연습에서 다음 낱말'],
  ['ESC', '뒤로 가기'],
  ['F1', '도움말 열기/닫기'],
];

export function Help() {
  return (
    <div className="overlay">
      <DosWindow title="도움말" width="narrow">
        <table className="help-table">
          <tbody>
            {KEYS.map(([key, label]) => (
              <tr key={key}>
                <th>{key}</th>
                <td>{label}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="dim">
          타수는 한 번 누른 키를 1타로 셉니다. 한글은 자모 단위(닭 = 4타), 쌍자음은 1타.
          <br />
          조합 중인 한글은 글자가 완성될 때까지 오타로 보지 않습니다.
        </p>
        <p className="blink-text">아무 키나 누르면 닫힙니다</p>
      </DosWindow>
    </div>
  );
}
