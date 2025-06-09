import { useEffect } from 'react';
import styled from 'styled-components';

// hook
import { useBottom } from '@/hooks/useBottom';
import { useA2HS } from '@/hooks/useA2HS';
// utils
import handleFinish from '@/utils/finishPlan';
// ifs
import { PlanData } from '@/Interface/IPlan';

import HomeTitle from '@/component/Home/HomeTitle';
import PlanComponent from '@/component/Home/PlanComponent';
import PlanComplete from '@/component/Home/PlanComplete';
import BottomSheet from '@/component/Common/BottomSheet/BottomSheet';
import A2HS from '@/component/Home/A2HS';
import IOSGuide from '@/component/Home/IOSGuide';

const HomeContainer = ({ planData }: PlanData) => {
  const data = planData[0];

  const { isVisible, isIOSGuideVisible, installApp, cancel, cancelIOSGuide } = useA2HS();
  const { openBottom, setOpenBottom } = useBottom();

  useEffect(() => {
    if (!data) {
      return;
    }

    if (data?.daily_list!.length - 1 === data?.total_date) {
      if (
        data?.daily_list![data.total_date - 1].current_step === 2 ||
        data?.daily_list![data.total_date - 1].current_step === 3
      ) {
        finish(data.plan_id!);
      }
    }
  }, []);

  const finish = async (id: number) => {
    const res = await handleFinish(id);

    if (res === 200) {
      setOpenBottom(true);
    }
  };

  return (
    <>
      <Home>
        <HomeTitle />
        <PlanComponent planData={planData} />
        {openBottom && (
          <BottomSheet
            height={480}
            isOpen={openBottom}
            onClose={() => {
              setOpenBottom(false);
            }}
          >
            <PlanComplete setOpenBottom={setOpenBottom} />
          </BottomSheet>
        )}
        {isVisible && <A2HS onInstall={installApp} onCancel={cancel} />}
        {isIOSGuideVisible && <IOSGuide onClick={cancelIOSGuide} />}
      </Home>
    </>
  );
};

export default HomeContainer;

const Home = styled.main`
  position: relative;
  background-color: ${props => props.theme.primary_08};
  height: 100%;
`;
