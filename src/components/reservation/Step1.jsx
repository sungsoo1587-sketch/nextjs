export default function Step1({onMove}) {
  return (
    <div>
      <p>만 14세 이상의 본인 명의 휴대전화를 소지하셔야 예약할 수 있습니다.</p>
      <button onClick={() => onMove(2)}>다음</button>
    </div>
  );
}
