export default function Step3({onPrev }) {
  return (
    <div>
      <p>333333333333</p>
      <button onClick={onPrev}>이전</button>
      <button onClick={()=> alert('완료')}>완료</button>
    </div>
  );
}