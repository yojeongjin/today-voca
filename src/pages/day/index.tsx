import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import axios from '../../utils/axiosInstance';

// container
import DayContainer from '@/container/Day/DayContainer';

const Day: NextPage = () => {
  return <DayContainer />;
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

  console.log(params);
  try {
    const result = await axios.get(`${process.env.NEXT_SERVER_APP_API_KEY}/v1/day`, {
      params,
      headers: {
        cookie: ctx.req?.headers?.cookie,
      },
      withCredentials: true,
    });

    const dayData = result.data.data.data;
    console.log(dayData);

    if (result.data.code === 200) {
      return {
        props: { dayData },
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
        destination: `/`, // 나중에 다시 수정
        permanent: false,
      },
    };
  }
};

export default Day;
