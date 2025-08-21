export default function Step3({onMove }) {
  return (
    <div>
      <p>333333333333</p>
      <button onClick={() => onMove(2)}>이전</button>
      <button onClick={()=> alert('완료')}>완료</button>
    </div>
  );
}