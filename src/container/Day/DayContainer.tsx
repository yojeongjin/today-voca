// hooks
import { useStep } from '@/hooks/useStep';
// ifs
import { DayProps } from '@/Interface/IDay';
// components
import Practice1 from '@/component/Day/Practice1';
import Practice2 from '@/component/Day/Practice2';
import Practice3 from '@/component/Day/Practice3';
import StepTitle from '@/component/Common/Title/StepTitle';

const DayContainer = ({ dayData }: DayProps) => {
  const steps = ['one', 'two', 'three'] as const;
  const { step, next, back, isFirst } = useStep(steps);

  return (
    <>
      {step === 'one' && <Practice1 dayData={dayData} onNext={next} />}
      {step === 'two' && <Practice2 />}
      {step === 'three' && <Practice3 />}
    </>
  );
};

export default DayContainer;
