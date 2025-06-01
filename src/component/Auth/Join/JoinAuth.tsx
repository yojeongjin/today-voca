import { useState } from 'react';
import styled from 'styled-components';
// hooks
import useFocus from '@/hooks/useFocus';
import Toast from '@/component/Common/Modal/Toast';

interface JoinAuthProps {
  setIsVerified: React.Dispatch<React.SetStateAction<boolean>>;
  emailCode: string | null;
}

const JoinAuth = ({ setIsVerified, emailCode }: JoinAuthProps) => {
  const [openToast, setOpenToast] = useState(false);
  // 자동 포커싱
  const { focusNum1, focusNum2, focusNum3, focusNum4, focusNum5, handleMoveFocus } = useFocus();

  // auth code 비교
  const checkAuthCode = () => {
    const inputCode =
      (focusNum1.current?.value || '') +
      (focusNum2.current?.value || '') +
      (focusNum3.current?.value || '') +
      (focusNum4.current?.value || '') +
      (focusNum5.current?.value || '');

    if (emailCode && inputCode === emailCode) {
      setIsVerified(true);
    } else {
      setOpenToast(true);
    }
  };

  // auth code input
  const renderCodeInput = (
    name: string,
    ref?: React.RefObject<HTMLInputElement>,
    moveFocus?: number,
    isLast?: boolean,
  ) => (
    <AuthInput
      type="tel"
      inputMode="numeric"
      name={name}
      ref={ref}
      maxLength={1}
      onChange={e => {
        if (e.target.value.length === 1 && moveFocus) {
          handleMoveFocus(moveFocus);
        }
        // 인증 코드 비교 시도
        if (isLast) {
          setTimeout(() => {
            checkAuthCode();
          }, 50); // focus가 끝난 후 실행되도록 약간의 delay
        }
      }}
    />
  );

  return (
    <ModalContent>
      <ModalP>
        작성하신 이메일로 회원가입 인증코드를 발송하였습니다.<br></br>
        이메일로 전송된 인증코드를 입력해 주세요.
      </ModalP>
      <AuthBox>
        {renderCodeInput('codeNo1', focusNum1, 1)}
        {renderCodeInput('codeNo2', focusNum2, 2)}
        {renderCodeInput('codeNo3', focusNum3, 3)}
        {renderCodeInput('codeNo4', focusNum4, 4)}
        {renderCodeInput('codeNo5', focusNum5, undefined, true)}
      </AuthBox>
      <ReSendBox>
        <ReSpan>이메일이 오지않았나요?</ReSpan>
        <ResendBtn>재전송</ResendBtn>
      </ReSendBox>
      {openToast && <Toast setOpenToast={setOpenToast}>인증번호가 올바르지 않습니다.</Toast>}
    </ModalContent>
  );
};

export default JoinAuth;

const ModalContent = styled.div`
  display: flex;
  justify-content: center;
  flex-flow: column;
  gap: 24px;
`;

const ModalP = styled.p`
  color: #333;
  text-align: center;
`;

const AuthBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const AuthInput = styled.input`
  background-color: ${props => props.theme.primary_08};
  width: 18%;
  height: 55px;
  border-radius: 8px;
  text-align: center;
  font-size: 22px;
  font-wieght: 600;
  border: 1px solid #dedede;
`;

const ReSendBox = styled.div`
  font-size: 13px;
  text-align: center;
`;

const ReSpan = styled.span`
  font-size: 13px;
  color: ${props => props.theme.primary_06};
`;

const ResendBtn = styled.button`
  font-size: 13px;

  color: ${props => props.theme.primary_01};
  text-decoration: underline;
`;
