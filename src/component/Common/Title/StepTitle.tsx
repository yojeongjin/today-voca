import { useState } from 'react';
import styled from 'styled-components';
// icons
import { SlArrowLeft } from 'react-icons/sl';
// components
import H3 from './H3';
import Hamburger from '../Header/Hamburger';
import Sidebar from '../Header/Sidebar';

interface StepTitleProps {
  children?: React.ReactNode;
  onBack?: () => void;
}

const StepTitle: React.FC<StepTitleProps> = ({ children, onBack }) => {
  const [openSidebar, setOpenSidebar] = useState<boolean>(false);

  return (
    <StepTitleBase>
      {onBack && (
        <StepBack onClick={onBack}>
          <SlArrowLeft />
        </StepBack>
      )}
      <StepName isBack={onBack !== undefined}>
        <H3>{children}</H3>
      </StepName>
      <Hamburger setOpenSidebar={setOpenSidebar} />
      {openSidebar && <Sidebar setOpenSidebar={setOpenSidebar} />}
    </StepTitleBase>
  );
};

export default StepTitle;

const StepTitleBase = styled.header`
  position: relative;
  display: flex;
  align-items: center;
  padding: 16px;
`;

const StepBack = styled.button`
  color: ${props => props.theme.font_color};
  font-size: 16px;
`;

const StepName = styled.div<{ isBack: boolean }>`
  width: ${props => (props.isBack ? '80%' : '90%')};
  display: flex;
  justify-content: center;
`;
