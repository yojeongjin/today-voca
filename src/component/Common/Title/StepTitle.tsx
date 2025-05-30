import styled from 'styled-components';
// icons
import { SlArrowLeft } from 'react-icons/sl';
// components
import H3 from './H3';

interface StepTitleProps {
  children: React.ReactNode;
  onBack?: () => void;
}

const StepTitle: React.FC<StepTitleProps> = ({ children, onBack }) => {
  return (
    <StepTitleBase>
      {onBack && (
        <StepBack onClick={onBack}>
          <StepIcon />
        </StepBack>
      )}
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
  padding: 24px;
`;

const StepBack = styled.button`
  position: absolute;
  left: 8px;
`;

const StepIcon = styled(SlArrowLeft)`
  color: ${props => props.theme.font_color};
  font-size: 14px;
`;
