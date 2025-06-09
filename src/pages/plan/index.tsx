import { NextPage } from 'next';
// components
import PlanContainer from '@/container/Plan/PlanContainer';
import SeoHead from '@/component/Common/SeoHead/SeoHead';

const Plan: NextPage = () => {
  return (
    <>
      <SeoHead title="플랜심기 | 콩글리시" url="https://www.konglish.shop/plan" />
      <PlanContainer />
    </>
  );
};

export default Plan;
