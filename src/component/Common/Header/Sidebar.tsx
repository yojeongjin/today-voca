import { useRouter } from 'next/router';
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

interface SidebarProps {
  setOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({ setOpenSidebar }) => {
  const router = useRouter();

  // sidebar 밖 클릭시 sidebar off
  const outside = useRef<HTMLDivElement | null>(null);
  const handleOutside = (e: MouseEvent) => {
    if (!outside?.current?.contains(e.target as Node)) {
      setOpenSidebar(false);
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleOutside);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
    };
  });

  return (
    <SidebarSection>
      <SidebarInner>
        {/* sidebar */}
        <SidebarBase ref={outside}>
          {/* logo */}
          <Logo
            src="/images/logo.png"
            alt="로고"
            onClick={() => {
              setOpenSidebar(false);
              return router.push('/');
            }}
          />

          {/* menu-item */}
          <NavMenu>
            <NavItem
              onClick={() => {
                setOpenSidebar(false);
                return router.push('/');
              }}
            >
              내 플랜 관리
            </NavItem>

            <NavItem
              onClick={() => {
                setOpenSidebar(false);
                return router.push('/');
              }}
            >
              단어장
            </NavItem>
          </NavMenu>
        </SidebarBase>
      </SidebarInner>
    </SidebarSection>
  );
};

export default Sidebar;

const SidebarSection = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

const SidebarInner = styled.div`
  position: relative;
  width: 100%;
  max-width: 720px;
  height: calc(var(--vh, 1vh) * 100);
`;

const SidebarBase = styled.div`
  background-color: #fff;
  position: absolute;
  right: 0;
  width: 240px;
  height: 100%;
  padding: 30px 0;
`;

const Logo = styled.img`
  display: block;
  width: 120px;
  margin: 0 auto;
  cursor: pointer;
`;

const NavMenu = styled.ul`
  margin-top: 40px;
`;

const NavItem = styled.li`
  position: relative;
  display: flex;
  align-items: center;
  padding: 20px;
  border-top: 1px solid rgba(0, 0, 0, 0.03);
  cursor: pointer;
  &:after {
    content: '';
    position: absolute;
    right: 20px;
    width: 6px;
    height: 6px;
    border: 1px solid ${props => props.theme.primary_03};
    border-left: 0;
    border-top: 0;
    transform: rotate(315deg);
  }
  &:first-child {
    border-top: 0;
  }
`;
