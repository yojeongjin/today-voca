import { useEffect, useState } from 'react';
import styled from 'styled-components';
// utils
import axios from '@/utils/axiosInstance';
import { handleApiError } from '@/utils/handleApiError';
// hook
import { useBottom } from '@/hooks/useBottom';
// ifs
import { PlanData } from '@/Interface/IPlan';

import HomeTitle from '@/component/Home/HomeTitle';
import PlanComponent from '@/component/Home/PlanComponent';
import PlanComplete from '@/component/Home/PlanComplete';
import BottomSheet from '@/component/Common/BottomSheet/BottomSheet';

const HomeContainer = ({ planData }: PlanData) => {
  const data = planData[0];
  const { openBottom, setOpenBottom } = useBottom();

  // useEffect(() => {
  //   if (!data) return;

  //   if (
  //     (data?.daily_list.length === data?.total_date &&
  //       data?.daily_list[data.total_date]?.current_step === 2) ||
  //     3
  //   ) {
  //     handleFinish();
  //   }
  // }, []);

  const handleFinish = async () => {
    try {
      const res = await axios.patch(`${process.env.NEXT_PUBLIC_APP_API_KEY}/v1/plan`);
      console.log(res.data);
      if (res.data.code === 200) {
        setOpenBottom(true);
      }
    } catch (err) {
      handleApiError(err);
    }
  };

  return (
    <Home>
      <HomeTitle />
      <PlanComponent planData={planData} />
      {openBottom && (
        <BottomSheet height={480} isOpen={openBottom}>
          <PlanComplete setOpenBottom={setOpenBottom} />
        </BottomSheet>
      )}
    </Home>
  );
};

export default HomeContainer;

const Home = styled.main`
  background-color: ${props => props.theme.primary_08};
  height: 100%;
`;
