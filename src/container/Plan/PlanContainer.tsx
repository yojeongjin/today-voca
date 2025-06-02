import { useState } from 'react';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
// utils
import axios from '@/utils/axiosInstance';
import { handleApiError } from '@/utils/handleApiError';
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
  const router = useRouter();
  const steps = ['title', 'course', 'result'] as const;
  const { step, next, back, isFirst } = useStep(steps);

  // plan data
  const [planInfo, setPlanInfo] = useState<PlanInfo>({
    title: '',
    plan_from: null,
    plan_to: null,
    level: '',
    course: '',
    emoji: '🏄🏻‍♀️',
  });

  const addPlanHandler = async () => {
    try {
      const body = {
        ...planInfo,
        total_date: dayjs(planInfo.plan_to).diff(dayjs().startOf('day'), 'day') + 1,
        plan_from: dayjs(planInfo.plan_from).format('YYYY-MM-DD HH:mm:ss'),
        plan_to: dayjs(planInfo.plan_to).format('YYYY-MM-DD HH:mm:ss'),
      };
      const res = await axios.post(`${process.env.NEXT_PUBLIC_APP_API_KEY}/v1/plan`, body);

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
            <PlanResult
              planInfo={planInfo}
              setPlanInfo={setPlanInfo}
              onNext={next}
              addPlanHandler={addPlanHandler}
            />
          </>
        )}
      </StepComponent>
    </>
  );
};

export default PlanContainer;
