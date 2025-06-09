import { NextPage } from 'next';
import JoinContainer from '@/container/Join/JoinContainer';
import SeoHead from '@/component/Common/SeoHead/SeoHead';

const Join: NextPage = () => {
  return (
    <>
      <SeoHead title="회원가입 | 콩글리시" url="https://www.konglish.shop/join" />
      <JoinContainer />;
    </>
  );
};

export default Join;
