import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import axios from '@/utils/axiosInstance';
import { DayProps } from '@/Interface/IDay';
// container
import DayContainer from '@/container/Day/DayContainer';
import SeoHead from '@/component/Common/SeoHead.tsx/SeoHead';

const Day: NextPage<DayProps> = ({ dayData, plan_id, day_number, day_size, level, percent }) => {
  return (
    <>
      <SeoHead
        title={`Day${day_number ?? day_number} | 콩글리시`}
        url={`https://www.konglish.shop/day?day=${day_number}&day_size=${day_size}&level=${level}`}
      />
      <DayContainer dayData={dayData} plan_id={plan_id} day_number={day_number} percent={percent} />
    </>
  );
};

// ssr
export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const queryParams = ['day', 'day_size', 'level'];

  const params = queryParams.reduce(
    (acc, key) => {
      // type 지정
      if (ctx.query[key]) {
        acc[key] = ctx.query[key] as string;
      }
      return acc;
    },
    {} as { [key: string]: string },
  );

  try {
    const result = await axios.get(`${process.env.NEXT_SERVER_APP_API_KEY}/v1/day`, {
      params,
      headers: {
        cookie: ctx.req?.headers?.cookie || '',
      },
      withCredentials: true,
    });

    const res = result.data.data;

    if (result.data.code === 200) {
      return {
        props: {
          dayData: res.data,
          plan_id: res.plan_id,
          percent: res.percent,
          day_number: Number(ctx.query.day),
          day_size: ctx.query.day_size,
          level: ctx.query.level,
        },
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
        destination: `/`,
        permanent: false,
      },
    };
  }
};

export default Day;
