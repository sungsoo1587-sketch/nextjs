export default function Step2({ onMove }) {
  return (
    <div>
      <p>2222222222222</p>
      <button onClick={() => onMove(1)}>이전</button>
      <button onClick={() => onMove(3)}>다음</button>
    </div>
  );
}