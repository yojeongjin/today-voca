import Image from 'next/image';
import styled from 'styled-components';
// components
import H2 from '../../Common/Title/H2';

interface JoinProps {
  isVerified: boolean;
  isLoading: boolean;
  joinInfo: { email: string; pwd: string; rePwd: string; name: string };
  valid: { email: boolean; pwd: boolean; rePwd: boolean; name: boolean };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAuth: () => void;
}

const JoinComponent = ({
  isVerified,
  isLoading,
  joinInfo,
  valid,
  handleChange,
  handleAuth,
}: JoinProps) => {
  return (
    <JoinContents>
      <H2>회원정보 입력</H2>
      <JoinMenu>
        <JoinItem>
          <JoinH4>이메일(아이디)</JoinH4>
          <JoinInputBox>
            <JoinInput
              required
              placeholder="abc@email.com"
              type="email"
              name="email"
              autoComplete="off"
              isValid={valid.email || joinInfo.email === ''}
              onChange={handleChange}
              disabled={isVerified}
            />
            <JoinCheckBtn
              onClick={handleAuth}
              disabled={isVerified || isLoading || joinInfo.email === ''}
            >
              {isLoading ? (
                <Image
                  src="/images/spinner.gif"
                  alt="spinner"
                  width={50}
                  height={46}
                  quality={75}
                />
              ) : (
                '인증요청'
              )}
            </JoinCheckBtn>
          </JoinInputBox>
          {!valid.email && joinInfo.email !== '' && (
            <JoinCaution>이메일 형식에 맞게 작성해주세요.</JoinCaution>
          )}
        </JoinItem>

        <JoinItem>
          <JoinH4>비밀번호</JoinH4>
          <JoinInput
            required
            placeholder="숫자, 대소문자 포함하여 최소 8자 이상"
            type="password"
            name="pwd"
            isValid={valid.pwd || joinInfo.pwd === ''}
            onChange={handleChange}
          />
          {!valid.pwd && joinInfo.pwd !== '' && (
            <JoinCaution>숫자와 대소문자를 포함하여 8자 이상 작성해주세요.</JoinCaution>
          )}
        </JoinItem>

        <JoinItem>
          <JoinH4>비밀번호 확인</JoinH4>
          <JoinInput
            required
            placeholder="숫자, 대소문자 포함하여 최소 8자 이상"
            type="password"
            name="rePwd"
            isValid={valid.rePwd || joinInfo.rePwd === ''}
            onChange={handleChange}
          />
          {!valid.rePwd && joinInfo.rePwd !== '' && (
            <JoinCaution>비밀번호가 일치하지 않습니다.</JoinCaution>
          )}
        </JoinItem>

        <JoinItem>
          <JoinH4>닉네임</JoinH4>
          <JoinInput
            required
            placeholder="닉네임을 입력해주세요."
            name="name"
            autoComplete="off"
            isValid={valid.name || joinInfo.name === ''}
            onChange={handleChange}
          />
          {!valid.name && joinInfo.name !== '' && (
            <JoinCaution>한글과 영어만 사용하여 최소 두 글자 이상 작성해주세요.</JoinCaution>
          )}
        </JoinItem>
      </JoinMenu>
    </JoinContents>
  );
};

export default JoinComponent;

const JoinContents = styled.article``;

const JoinMenu = styled.ul`
  margin-top: 20px;
`;

const JoinItem = styled.li`
  padding: 8px 0;
  &:fisr-child {
    padding: 0 0;
  }
`;

const JoinH4 = styled.h4`
  margin-bottom: 4px;
  font-weight: 500;
  font-size: 13px;
  &:before {
    content: '*';
    color: #c64657;
    margin-right: 4px;
  }
`;

const JoinInputBox = styled.div`
  display: flex;
`;

const JoinInput = styled.input<{ isValid: boolean }>`
  background-color: ${props => props.theme.primary_08};
  width: 100%;
  height: 46px;
  padding: 12px 10px 12px 12px;
  border-radius: 8px;
  font-size: 14px;
  &:focus {
    border: 1px solid ${props => props.theme.primary_03};
  }
`;

const JoinCheckBtn = styled.button`
  background-color: #f3f9ff;
  width: 30%;
  font-size: 13px;
  margin-left: 12px;
  border-radius: 8px;
  color: #027fff;
  &:disabled {
    background-color: ${props => props.theme.primary_07};
    color: #f7f2f2;
    cursor: default;
  }
`;

// caution
const JoinCaution = styled.p`
  display: flex;
  align-items: center;
  padding: 3px 8px;
  color: #c64657;
  font-size: 14px;
`;
