import styled from 'styled-components';
// icons
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import H2 from '../Common/Title/H2';
import ApplyBtn from '../Common/Button/ApplyButton';

const JoinComponent = () => {
  return (
    <JoinBase>
      <JoinContents>
        <H2>회원정보 입력</H2>
        <JoinMenu>
          <JoinItem>
            <JoinH4>이메일(아이디)</JoinH4>
            <JoinInputBox>
              <JoinInput required placeholder="abc@email.com" type="email" name="email" />
              <JoinCheckBtn>인증요청</JoinCheckBtn>
            </JoinInputBox>
          </JoinItem>

          <JoinItem>
            <JoinH4>비밀번호</JoinH4>
            <JoinInput
              required
              placeholder="숫자, 대소문자 포함하여 최소 8자 이상"
              type="password"
              name="pwd"
            />
          </JoinItem>

          <JoinItem>
            <JoinH4>비밀번호 확인</JoinH4>
            <JoinInput
              required
              placeholder="숫자, 대소문자 포함하여 최소 8자 이상"
              type="password"
              name="rePwd"
            />
          </JoinItem>

          <JoinItem>
            <JoinH4>닉네임</JoinH4>
            <JoinInput required placeholder="닉네임을 입력해주세요." name="name" />
          </JoinItem>
        </JoinMenu>
        {/* 이용약관 동의 */}
        <AgreeContainer>
          {/* 전체 동의 */}
          <TotalAgree>
            <AgreeCheckInput type="checkbox" id="agree_check_all" name="agree_check_all" />
            <TotalLabel htmlFor="agree_check_all">이용약관 전체동의</TotalLabel>
          </TotalAgree>
          {/* 선택 동의 */}
          <AgreeMenu>
            <AgreeItem>
              <AgreeCheckInput type="checkbox" id="agree_check_used" name="guidanceAgreed" />
              <AgreeLabel htmlFor="agree_check_used">[필수] 이용약관 동의</AgreeLabel>
              <AgreeDetail>자세히</AgreeDetail>
            </AgreeItem>
            <AgreeItem>
              <AgreeCheckInput type="checkbox" id="agree_check_info" name="personalInfoAgreed" />
              <AgreeLabel htmlFor="agree_check_info">[선택] 개인정보 제3자 제공</AgreeLabel>
              <AgreeDetail>자세히</AgreeDetail>
            </AgreeItem>
          </AgreeMenu>
        </AgreeContainer>
        <ApplyBtn>가입하기</ApplyBtn>
      </JoinContents>
    </JoinBase>
  );
};

export default JoinComponent;

const JoinBase = styled.main`
  width: 100%;
  max-width: 450px;
  min-width: 280px;
  height: 100%;
  margin: 0 auto;
  padding: 16px;
`;

const JoinContents = styled.article`
  display: flex;
  justify-content: center;
  flex-flow: column;
  gap: 24px;
`;

const JoinMenu = styled.ul``;

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
    color: #9a404c;
    margin-right: 4px;
  }
`;

const JoinInput = styled.input`
  background-color: ${props => props.theme.primary_08};
  width: 100%;
  height: 46px;
  padding: 12px 10px 12px 12px;
  border-radius: 8px;
  font-size: 14px;
`;

const JoinInputBox = styled.div`
  display: flex;
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
  color: #9a404c;
  font-weight: 500;
`;

const ValidP = styled(JoinCaution)`
  color: ${props => props.theme.font_color};
  font-weight: 300;
`;

const ValidIcon = styled(IoMdCheckmarkCircleOutline)`
  font-size: 14px;
  margin-right: 4px;
`;

// 이용약관 동의
const AgreeContainer = styled.div``;

const AgreeMenu = styled.ul`
  margin-top: 16px;
`;

const AgreeItem = styled.li`
  position: relative;
  display: flex;
  padding: 8px 0;
  &:first-child {
    padding: 0 0;
  }
`;

const AgreeCheckInput = styled.input`
  appearance: none;
  width: 16px;
  height: 16px;
  border: 1px solid ${props => props.theme.primary_07};
  border-radius: 1px;
  margin-right: 10px;
  cursor: pointer;

  &:checked {
    background-color: ${props => props.theme.primary_03};
    border-color: transparent;
    background-image: url('/svg/check.svg');
    background-size: 100% 100%;
    background-position: 50%;
    background-repeat: no-repeat;
  }
`;

const AgreeDetail = styled.span`
  position: absolute;
  right: 12px;
  font-size: 13px;
  text-decoration: underline;
  cursor: pointer;
`;

const TotalAgree = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #ebebeb;
`;

const TotalLabel = styled.label`
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
`;

const AgreeLabel = styled.label`
  font-weight: 300;
  cursor: pointer;
`;
