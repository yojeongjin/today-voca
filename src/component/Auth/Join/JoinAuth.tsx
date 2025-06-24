import styled from 'styled-components';
// hooks
import useFocus from '@/hooks/useFocus';

interface JoinAuthProps {
  reAuth: () => void;
  countdown: number;
  setCode: React.Dispatch<React.SetStateAction<String>>;
}

const JoinAuth = ({ setCode, reAuth, countdown }: JoinAuthProps) => {
  // 자동 포커싱
  const { focusNum1, focusNum2, focusNum3, focusNum4, focusNum5, handleMoveFocus, getCode } =
    useFocus();

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
            const code = getCode();
            setCode(code);
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
        <Count>
          {Math.floor(countdown / 60)}:{String(countdown % 60).padStart(2, '0')}
        </Count>

        <BtnBox>
          <ReSpan>이메일이 오지않았나요?</ReSpan>
          <ResendBtn onClick={reAuth}>재전송</ResendBtn>
        </BtnBox>
      </ReSendBox>
    </ModalContent>
  );
};

export default JoinAuth;

const ModalContent = styled.div``;

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
  margin: 24px 0 8px;
  border-radius: 8px;
  text-align: center;
  font-size: 22px;
  font-wieght: 600;
  border: 1px solid #dedede;
`;

const ReSendBox = styled.div`
  display: flex;
  flex-flow: column;
`;

const Count = styled.span`
  color: ${props => props.theme.primary_01};
  text-align: right;
`;

const BtnBox = styled.div`
  font-size: 13px;
  text-align: center;
  color: ${props => props.theme.primary_06};
`;
const ReSpan = styled.span`
  font-size: 13px;
`;

const ResendBtn = styled.button`
  font-size: 13px;
  text-decoration: underline;
  color: ${props => props.theme.primary_06};
`;
