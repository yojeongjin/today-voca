import { useState } from 'react';
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
import BottomSheet from '@/component/Common/BottomSheet/BottomSheet';
import { useBottom } from '@/hooks/useBottom';
import PlanComplete from '@/component/Plan/PlanComplete';

const PlanContainer = () => {
  const steps = ['title', 'course', 'result'] as const;
  const { step, next, back, isFirst } = useStep(steps);
  const { openBottom, setOpenBottom } = useBottom();

  // plan data
  const [planInfo, setPlanInfo] = useState<PlanInfo>({
    title: '',
    startDate: null,
    endDate: null,
    level: '',
    course: '',
    emoji: '🏄🏻‍♀️',
  });

  const addPlanHandler = async () => {
    try {
      const body = {
        ...planInfo,
        total_date: dayjs(planInfo.endDate).diff(dayjs().startOf('day'), 'day') + 1,
        startDate: dayjs(planInfo.startDate).format('YYYY-MM-DD HH:mm:ss'),
        endDate: dayjs(planInfo.endDate).format('YYYY-MM-DD HH:mm:ss'),
      };
      const res = await axios.post(`${process.env.NEXT_PUBLIC_APP_API_KEY}/v1/plan`, body);
      if (res.data.code === 200) {
        setOpenBottom(true);
      }
    } catch (err) {
      handleApiError(err);
    } finally {
      setOpenBottom(false);
    }
  };

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
          <PlanResult
            planInfo={planInfo}
            setPlanInfo={setPlanInfo}
            onNext={next}
            addPlanHandler={addPlanHandler}
          />
        </>
      )}
      {openBottom && (
        <BottomSheet height={500} isOpen={openBottom}>
          <PlanComplete />
        </BottomSheet>
      )}
    </StepComponent>
  );
};

export default PlanContainer;
