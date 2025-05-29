import styled from 'styled-components';

interface ApplyBtnProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

const ApplyBtn: React.FC<ApplyBtnProps> = ({ children, onClick, disabled }) => {
  return (
    <Btn onClick={onClick} disabled={disabled}>
      {children}
    </Btn>
  );
};

export default ApplyBtn;

const Btn = styled.button<{ color?: string; margin?: string }>`
  background-color: ${props => props.theme.primary_01};
  width: 100%;
  height: 52px;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 500;
  color: ${props => props.theme.primary_09};
  &:disabled {
    background-color: ${props => props.theme.primary_02};
    cursor: default;
  }
`;
