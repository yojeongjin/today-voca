import { NextPage } from 'next';
// hooks
import { useStep } from '@/component/hooks/useStep';
// components
import StepComponent from '@/component/Common/Step/StepComponent';
import StepTitle from '@/component/Common/Title/StepTitle';
import PlanTitle from '@/component/Plan/PlanTitle';
import PlanCourse from '@/component/Plan/PlanCourse';
import PlanResult from '@/component/Plan/PlanResult';

const Plan: NextPage = () => {
  const steps = ['title', 'course', 'result'] as const;
  const { step, next, back, isFirst } = useStep(steps);

  return (
    <StepComponent stepKey={step}>
      {step === 'title' && <PlanTitle onNext={next} />}
      {step === 'course' && (
        <>
          <StepTitle onBack={!isFirst ? back : undefined}>학습유형 선택</StepTitle>
          <PlanCourse onNext={next} />
        </>
      )}
      {step === 'result' && (
        <>
          <StepTitle onBack={!isFirst ? back : undefined}>플랜 등록</StepTitle>
          <PlanResult />
        </>
      )}
    </StepComponent>
  );
};

export default Plan;
