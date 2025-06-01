import React, { useEffect, ReactNode } from 'react';
import styled, { keyframes } from 'styled-components';
// icons
import { VscChromeClose } from 'react-icons/vsc';

interface ToastProps {
  children: ReactNode;
  setOpenToast: React.Dispatch<React.SetStateAction<boolean>>;
}

const Toast = ({ setOpenToast, children }: ToastProps) => {
  useEffect(() => {
    // 1.5초 후 toast close
    const timer = setTimeout(() => {
      setOpenToast(false);
    }, 1500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <ToastBase
      onClick={() => {
        setOpenToast(false);
      }}
    >
      <ToastBox>
        {children}
        <ToastClose />
      </ToastBox>
    </ToastBase>
  );
};

export default Toast;

const slideIn = keyframes`
from {
  transform: translateY(0%);
}
to {
  transform: translateY(-40%);
}
`;

const ToastBase = styled.div`
  position: absolute;
  left: 0;
  bottom: 20px;
  width: 100%;
  animation: ${slideIn} 300ms ease-in-out 0s 1 normal forwards;
  cursor: pointer;
`;

const ToastBox = styled.div`
  background-color: #808289;
  width: 90%;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
  margin: 0 auto;
  color: #fff;
  border-radius: 3px;
  box-shadow: 0 0.3rem 0.7rem rgb(0 0 0 / 8%);
`;

const ToastClose = styled(VscChromeClose)`
  font-size: 18px;
`;
