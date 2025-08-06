import React, { useState } from 'react';
import Step1 from './reservation/Step1';
import Step2 from './reservation/Step2';
import Step3 from './reservation/Step3';

export default function MakeReservation() {
  const [step, setStep] = useState(1);
console.log(step)
  const goNextStep = () => setStep(prev => Math.min(prev + 1, 3));
  const goPrevStep = () => setStep(prev => Math.max(prev - 1, 1));
  return (
    <div>
      <h1>Step 01 예약 안내사항</h1>
      {step === 1 && (
          
          <Step1 onNext={goNextStep} />
      )}
      <h1>Step 02 방문 일정 선택</h1>
      {step === 2 && (
          
          <Step2 onNext={goNextStep} onPrev={goPrevStep} />
      )}
      <h1>Step 03 예약자 정보 입력</h1>
      {step === 3 && (
          
          <Step3 onPrev={goPrevStep} />
      )}
    </div>
  );
}
