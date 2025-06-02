import styled from 'styled-components';
import { BtnProps } from '@/Interface/IBtn';
// icons
import { RiCloseLargeLine } from 'react-icons/ri';

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
