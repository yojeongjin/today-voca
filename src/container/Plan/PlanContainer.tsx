import { useState } from 'react';
// hooks
import { useStep } from '@/hooks/useStep';
// type
import { PlanInfo } from '@/type/planInfo';
// components
import StepComponent from '@/component/Common/Step/StepComponent';
import StepTitle from '@/component/Common/Title/StepTitle';
import PlanTitle from '@/component/Plan/PlanTitle';
import PlanCourse from '@/component/Plan/PlanCourse';
import PlanResult from '@/component/Plan/PlanResult';

const PlanContainer = () => {
  const steps = ['title', 'course', 'result'] as const;
  const { step, next, back, isFirst } = useStep(steps);

  // plan data
  const [planInfo, setPlanInfo] = useState<PlanInfo>({
    title: '',
    startDate: null,
    endDate: null,
    course: '',
    emoji: '🏄🏻‍♀️',
  });

  return (
    <StepComponent stepKey={step}>
      {step === 'title' && (
        <PlanTitle planInfo={planInfo} setPlanInfo={setPlanInfo} onNext={next} />
      )}
      {step === 'course' && (
        <>
          <StepTitle onBack={!isFirst ? back : undefined}>학습유형 선택</StepTitle>
          <PlanCourse planInfo={planInfo} setPlanInfo={setPlanInfo} onNext={next} />
        </>
      )}
      {step === 'result' && (
        <>
          <StepTitle onBack={!isFirst ? back : undefined}>플랜 등록</StepTitle>
          <PlanResult planInfo={planInfo} setPlanInfo={setPlanInfo} onNext={next} />
        </>
      )}
    </StepComponent>
  );
};

export default PlanContainer;
