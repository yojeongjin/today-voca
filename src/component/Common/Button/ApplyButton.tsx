import styled from 'styled-components';

interface ApplyBtnProps {
  children: React.ReactNode;
  color?: string;
  onClick?: () => void;
  disabled?: boolean;
}

const ApplyBtn: React.FC<ApplyBtnProps> = ({ children, onClick, color, disabled }) => {
  return (
    <Btn color={color} onClick={onClick} disabled={disabled}>
      {children}
    </Btn>
  );
};

export default ApplyBtn;

const Btn = styled.button`
  background-color: ${props => (props.color ? props.color : '#027FFF')};
  width: 100%;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 500;
  color: ${props => props.theme.primary_09};
  &:disabled {
    background-color: ${props => props.theme.primary_02};
    cursor: default;
  }
`;
