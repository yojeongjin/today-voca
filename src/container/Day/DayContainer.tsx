import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
// utils
import axios from '@/utils/axiosInstance';
import { handleApiError } from '@/utils/handleApiError';
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

const DayContainer = ({ dayData, plan_id, day_number }: DayProps) => {
  const router = useRouter();

  const steps = ['1', '2', '3'] as const;
  const { step, next, back, isFirst } = useStep(steps);

  useEffect(() => {
    handleHistory('progress');
  }, [step]);

  const handleHistory = useCallback(
    async (state: string) => {
      try {
        const body = {
          state: state,
          step: Number(step),
          day_number: day_number,
        };
        await axios.patch(`${process.env.NEXT_PUBLIC_APP_API_KEY}/v1/day`, body);
      } catch (err) {
        handleApiError(err);
      }
    },
    [step],
  );

  const handleFinish = async () => {
    try {
      const body = {
        plan_id: plan_id,
        day_number: day_number,
      };
      const res = await axios.patch(`${process.env.NEXT_PUBLIC_APP_API_KEY}/v1/day/done`, body);
      if (res.data.code === 200) {
        router.push('/');
      }
    } catch (err) {
      handleApiError(err);
    }
  };

  return (
    <>
      <StepComponent stepKey={step}>
        {step === '1' && (
          <>
            <StepTitle onBack={!isFirst ? back : undefined}>필수 어휘</StepTitle>
            <Practice1 dayData={dayData} onNext={next} />
          </>
        )}
        {step === '2' && (
          <>
            <StepTitle onBack={!isFirst ? back : undefined}>필수 어휘</StepTitle>
            <Practice2 dayData={dayData} onNext={next} handleFinish={handleFinish} />
          </>
        )}
        {step === '3' && (
          <>
            <StepTitle onBack={!isFirst ? back : undefined}>반복 테스트</StepTitle>
            <Practice3 dayData={dayData} onNext={next} handleFinish={handleFinish} />
          </>
        )}
      </StepComponent>
    </>
  );
};

export default DayContainer;
