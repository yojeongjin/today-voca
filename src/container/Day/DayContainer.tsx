// hooks
import { useStep } from '@/hooks/useStep';
// components
import Practice1 from '@/component/Day/Practice1';
import Practice2 from '@/component/Day/Practice2';
import Practice3 from '@/component/Day/Practice3';
import StepTitle from '@/component/Common/Title/StepTitle';

const DayContainer = () => {
  const steps = ['one', 'two', 'three'] as const;
  const { step, next, back, isFirst } = useStep(steps);

  return (
    <>
      <StepTitle>🏄🏻‍♀️ 플랜명</StepTitle>
      {step === 'one' && <Practice1 onNext={next} />}
      {step === 'two' && <Practice2 />}
      {/* {step === 'three' && <Practice3 />} */}
      <Practice3 />
    </>
  );
};

export default DayContainer;
