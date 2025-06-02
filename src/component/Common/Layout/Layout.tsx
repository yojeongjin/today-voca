import { ReactNode } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import BottomNav from '../BottomNav/BottomNav';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const router = useRouter();

  if (
    router.pathname === '/signin' ||
    router.pathname === '/join' ||
    router.pathname === '/plan' ||
    router.pathname === '/day/[slug]'
  ) {
    return (
      <LayoutBase>
        <Inner>{children}</Inner>
      </LayoutBase>
    );
  }
  return (
    <LayoutBase>
      <LayoutInner>{children}</LayoutInner>
      {/* <BottomNav /> */}
    </LayoutBase>
  );
};

export default Layout;

const LayoutBase = styled.main``;

const LayoutInner = styled.div`
  height: calc(var(--vh, 1vh) * 100 - 60px);
`;

const Inner = styled(LayoutInner)`
  height: calc(var(--vh, 1vh) * 100);
`;
