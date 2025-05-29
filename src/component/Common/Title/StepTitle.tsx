import styled from 'styled-components';
// icons
import { SlArrowLeft } from 'react-icons/sl';
// components
import H3 from './H3';

interface StepTitleProps {
  children: React.ReactNode;
}

const StepTitle: React.FC<StepTitleProps> = ({ children }) => {
  return (
    <StepTitleBase>
      <StepBack>
        <StepIcon />
      </StepBack>
      <H3>{children}</H3>
    </StepTitleBase>
  );
};

export default StepTitle;

const StepTitleBase = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StepBack = styled.button`
  position: absolute;
  left: 0;
`;

const StepIcon = styled(SlArrowLeft)`
  // font-size: 25px;
`;
