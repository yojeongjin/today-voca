import styled from 'styled-components';
// icons
import { RiCloseLargeLine } from 'react-icons/ri';

interface BtnProps {
  onClick?: () => void;
}

const CloseButton = ({ onClick }: BtnProps) => {
  return (
    <CloseBtn onClick={onClick}>
      <RiCloseLargeLine />
    </CloseBtn>
  );
};

export default CloseButton;

const CloseBtn = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  font-size: 16px;
`;
