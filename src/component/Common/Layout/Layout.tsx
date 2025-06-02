import { ReactNode } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Header from '../Header/Header';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const router = useRouter();

  if (
    router.pathname === '/signin' ||
    router.pathname === '/join' ||
    router.pathname === '/plan' ||
    router.pathname === '/day'
  ) {
    return (
      <LayoutBase>
        <Inner>{children}</Inner>
      </LayoutBase>
    );
  }
  return (
    <LayoutBase>
      <Header />
      <LayoutInner>{children}</LayoutInner>
    </LayoutBase>
  );
};

export default Layout;

const LayoutBase = styled.main``;

const LayoutInner = styled.div`
  height: calc(var(--vh, 1vh) * 100 - 50px);
  margin-top: 50px;
`;

const Inner = styled.div`
  height: calc(var(--vh, 1vh) * 100);
`;
