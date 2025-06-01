import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { IoCloseOutline } from 'react-icons/io5';
import H4 from '../Title/H4';

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
  onApply?: () => void;
  disabled?: boolean;
  modalRef: React.RefObject<HTMLDivElement>;
}

const Modal = ({ children, onClose, onApply, disabled, modalRef }: ModalProps) => {
  return (
    <ModalBase>
      <ModalInner ref={modalRef}>
        <ModalHeading>
          <H4>알림</H4>
          <ModalCloseBtn onClick={onClose}>
            <IoCloseOutline />
          </ModalCloseBtn>
        </ModalHeading>
        <ModalBody>{children}</ModalBody>
        <ApplyBtn disabled={disabled} onClick={onApply}>
          확인
        </ApplyBtn>
      </ModalInner>
    </ModalBase>
  );
};

export default Modal;

const ModalBase = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
  z-index: 999;
`;

const ModalInner = styled.div`
  background: #fff;
  width: 100%;
  max-width: 450px;
  min-width: 280px;
  border-radius: 5px;
`;

const ModalHeading = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-bottom: 1px solid #ebebeb;
`;

const ModalCloseBtn = styled.button`
  display: flex;
  align-items: center;
  font-size: 22px;
  padding: 0 0;
  color: ${props => props.theme.primary_03};
`;

const ModalBody = styled.div`
  padding: 20px 16px 28px;
`;

const ApplyBtn = styled.button`
  background-color: ${props => props.theme.primary_01};
  width: 100%;
  height: 47px;
  font-size: 14px;
  color: #fff;
  border-radius: 0 0 5px 5px;
  &:disabled {
    background-color: ${props => props.theme.primary_07};
    cursor: default;
  }
`;
