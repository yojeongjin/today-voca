import React, { useState } from 'react';
import styled from 'styled-components';
// components
import Hamburger from './Hamburger';
import Sidebar from './Sidebar';

const Header: React.FC = () => {
  const [openSidebar, setOpenSidebar] = useState<boolean>(false);

  return (
    <HeaderBase>
      <HeaderInner>
        <Hamburger setOpenSidebar={setOpenSidebar} />
      </HeaderInner>
      {openSidebar && <Sidebar setOpenSidebar={setOpenSidebar} />}
    </HeaderBase>
  );
};

export default Header;

// styled-components
const HeaderBase = styled.header`
  background-color: ${props => props.theme.primary_08};
  position: fixed;
  top: 0;
  width: 100%;
  max-width: 720px;
  min-width: 280px;
  z-index: 9;
`;

const HeaderInner = styled.div`
  position: relative;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin: 4px auto 0;
  padding: 0 16px;
`;
