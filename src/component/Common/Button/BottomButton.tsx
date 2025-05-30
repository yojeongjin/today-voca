import { useEffect, useState } from 'react';
import styled from 'styled-components';

interface ButtomBtnProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

const BottomButton: React.FC<ButtomBtnProps> = ({ children, onClick, disabled }) => {
  const [resizeHeight, setResizeHeight] = useState<number>(0);

  useEffect(() => {
    const handler = () => {
      const vv = window.visualViewport;
      if (vv) {
        setResizeHeight(window.innerHeight - vv.height);
      }
    };

    window.visualViewport?.addEventListener('resize', handler);
    handler(); // 초기 세팅
    return () => window.visualViewport?.removeEventListener('resize', handler);
  }, []);

  return (
    <BottomBtn
      onClick={onClick}
      disabled={disabled}
      style={{ bottom: `calc(${resizeHeight}px + 30px)` }}
    >
      {children}
    </BottomBtn>
  );
};

export default BottomButton;

const BottomBtn = styled.button`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  background-color: ${props => props.theme.primary_01};
  width: 90%;
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
