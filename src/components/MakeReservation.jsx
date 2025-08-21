import React, { useState } from 'react';
import Step1 from './reservation/Step1';
import Step2 from './reservation/Step2';
import Step3 from './reservation/Step3';

export default function MakeReservation() {
  const [step, setStep] = useState(1);
  const steps = [
    { title: "Step 01 예약 안내사항", component: Step1 },
    { title: "Step 02 방문 일정 선택", component: Step2 },
    { title: "Step 03 예약자 정보 입력", component: Step3 },
  ];
  const goStep = (target) => {
    if (target < 1 || target > steps.length) return;
    console.log(target)
    console.log(steps.length)
    setStep(target);
  };

  return (
    <div>
      {steps.map((s, index) => {
        const StepComponent = s.component;
        return (
          <div key={index}>
            <h1
              style={{
                color: step === index + 1 ? 'red' : '#000',
              }}
            >
              {s.title}
            </h1>

            {step === index + 1 && <StepComponent onMove={goStep} />}
          </div>
        );
      })}
    </div>
  );
}
