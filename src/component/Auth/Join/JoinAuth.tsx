import styled from 'styled-components';

const JoinAuth = () => {
  return (
    <ModalContent>
      <ModalP>
        작성하신 이메일로 회원가입 인증코드를 발송하였습니다.<br></br>
        이메일로 전송된 인증코드를 입력해 주세요.
      </ModalP>
      <AuthBox>
        <AuthInput />
        <AuthInput />
        <AuthInput />
        <AuthInput />
        <AuthInput />
      </AuthBox>
      <ReSendBox>
        <ReSpan>이메일이 오지않았나요?</ReSpan>
        <ResendBtn>재전송</ResendBtn>
      </ReSendBox>
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
  letter-spacing: -0.5px;
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
