import { ReactNode } from 'react';
import styled from 'styled-components';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <LayoutBase>
      <LayoutInner>{children}</LayoutInner>
    </LayoutBase>
  );
};

export default Layout;

const LayoutBase = styled.main``;

const LayoutInner = styled.div`
  height: calc(var(--vh, 1vh) * 100);
`;

const Inner = styled.div`
  height: calc(var(--vh, 1vh) * 100);
`;
