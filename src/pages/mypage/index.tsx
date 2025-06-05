import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import axios from '@/utils/axiosInstance';
import { PlanData } from '@/Interface/IPlan';
import MypageComponent from '@/component/Mypage/MypageComponent';

const Mypage: NextPage<PlanData> = ({ planData }) => {
  return <MypageComponent planData={planData} />;
};

// ssr
export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const result = await axios.get(`${process.env.NEXT_SERVER_APP_API_KEY}/v1/plan/all`, {
      headers: {
        cookie: ctx.req?.headers?.cookie,
      },
      withCredentials: true,
    });
    const planData = result.data.data.data;

    if (result.data.code === 200) {
      return {
        props: { planData },
      };
    }

    return {
      redirect: {
        destination: `/err`,
        permanent: false,
      },
    };
  } catch (err: any) {
    console.error('SSR 인증 실패:', err.response?.data?.error || err.message);

    return {
      redirect: {
        destination: `/signin?redirect=${ctx.resolvedUrl}`, // 나중에 다시 수정
        permanent: false,
      },
    };
  }
};

export default Mypage;
