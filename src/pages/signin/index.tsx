import { NextPage } from 'next';
// components
import SigninComponent from '@/component/Auth/SigninComponent';
import SeoHead from '@/component/Common/SeoHead.tsx/SeoHead';

const Signin: NextPage = () => {
  return (
    <>
      <SeoHead title="로그인 | 콩글리시" url="https://www.konglish.shop/signin" />
      <SigninComponent />
    </>
  );
};

export default Signin;
