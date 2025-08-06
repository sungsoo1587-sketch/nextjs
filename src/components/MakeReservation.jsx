import Step1 from './reservation/Step1';
import Step2 from './reservation/Step2';
import Step3 from './reservation/Step3';

export default function MakeReservation() {
  return (
    <div>
      <h1>Step 01 예약 안내사항</h1>
      <Step1 />
      <h1>Step 02 방문 일정 선택</h1>
      <h1>Step 03 예약자 정보 입력</h1>
    </div>
  );
}
