// hooks
import { useStep } from '@/hooks/useStep';
// ifs
import { DayProps } from '@/Interface/IDay';
// components
import Practice1 from '@/component/Day/Practice1';
import Practice2 from '@/component/Day/Practice2';
import Practice3 from '@/component/Day/Practice3';
import StepTitle from '@/component/Common/Title/StepTitle';
import StepComponent from '@/component/Common/Step/StepComponent';

const DayContainer = ({ dayData }: DayProps) => {
  const steps = ['one', 'two', 'three'] as const;
  const { step, next, back, isFirst } = useStep(steps);
  return (
    <>
      <StepComponent stepKey={step}>
        {step === 'one' && (
          <>
            <StepTitle onBack={!isFirst ? back : undefined}>필수 어휘</StepTitle>
            <Practice1 dayData={dayData} onNext={next} />
          </>
        )}
        {step === 'two' && (
          <>
            <StepTitle onBack={!isFirst ? back : undefined}>필수 어휘</StepTitle>
            <Practice2 dayData={dayData} onNext={next} />
          </>
        )}
        {step === 'three' && (
          <>
            <StepTitle onBack={!isFirst ? back : undefined}></StepTitle>
            <Practice3 dayData={dayData} onNext={next} />
          </>
        )}
      </StepComponent>
    </>
  );
};

export default DayContainer;
