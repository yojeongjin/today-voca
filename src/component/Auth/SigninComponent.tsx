import React, { useRef, useState } from 'react';
import styled from 'styled-components';
// icons
import { IoMailOutline, IoKeyOutline } from 'react-icons/io5';
import { RiKakaoTalkFill } from 'react-icons/ri';

// component
import ApplyBtn from '../Common/Button/ApplyButton';

const SigninComponent = () => {
  // ref
  const idRef = useRef<HTMLInputElement>(null);
  const pwRef = useRef<HTMLInputElement>(null);
  // input state
  const [inputState, setInputState] = useState(false);

  return (
    <SigninBase>
      <SigninContents>
        {/* id input */}
        <InputWrapper>
          <InputLabel htmlFor="idInput">
            <Input id="idInput" type="text" required placeholder="&nbsp;" ref={idRef} />
            <InputSpan>
              <IdIcon />
              아이디를 입력해주세요.
            </InputSpan>
          </InputLabel>
        </InputWrapper>
        {/* pw input */}
        <InputWrapper>
          <InputLabel htmlFor="pwInput">
            <Input
              id="pwInput"
              type="password"
              required
              ref={pwRef}
              placeholder="&nbsp;"
              onChange={() => {
                setInputState(true);
              }}
            />
            <InputSpan>
              <PwIcon />
              비밀번호를 입력해주세요.
            </InputSpan>
          </InputLabel>
        </InputWrapper>
        {/* 자동로그인 & 아이디,비밀번호 찾기 */}
        <CheckContainer>
          <CheckBox>
            <CheckInput type="checkbox" id="auto-signin" />
            <CheckLabel htmlFor="auto-signin">자동로그인</CheckLabel>
          </CheckBox>
          <FindMenu>
            <FindItem>아이디 찾기</FindItem>
            <FindItem>비밀번호 찾기</FindItem>
          </FindMenu>
        </CheckContainer>
        {/* button */}
        <ApplyBtn disabled={!inputState}>로그인</ApplyBtn>
        <JoinBtn>이메일로 가입하기</JoinBtn>
      </SigninContents>
    </SigninBase>
  );
};

export default SigninComponent;

const SigninBase = styled.main`
  width: 100%;
  max-width: 450px;
  min-width: 280px;
  height: 100%;
  margin: 0 auto;
`;

const SigninContents = styled.article`
  height: 100%;
  padding: 0 24px;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;

// input
const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InputLabel = styled.label`
  position: relative;
  margin: 0 auto;
  width: 100%;
`;

const InputSpan = styled.span`
  background-color: #fff;
  position: absolute;
  top: 11px;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
  padding: 5px 15px;
  transform-origin: 0 0;
  transition: all 0.2s ease;
  color: ${props => props.theme.primary_06};
  cursor: text;
`;

const Input = styled.input`
width: 100%;
// max-width: 300px;
// min-width: 230px;
height: 48px;
padding: 16px;
transition: all .15s ease;
border: 1px solid #e0e0e0;
border-radius: 8px;
&:not(:placeholder-shown){
  + ${InputSpan} {
    color #5A667F;
    transform: translateY(-20px) scale(.9);
  }
}
&:focus{
  background: none;
  outline: none;
  border: 1px solid #797979;
  + ${InputSpan} {
    color: #0077FF;
    transform: translateY(-20px) scale(.9);
    transition-delay: .1s;
  }
}
`;

// icon
const IdIcon = styled(IoMailOutline)`
  margin-right: 5px;
  font-size: 15px;
`;

const PwIcon = styled(IoKeyOutline)`
  margin-right: 5px;
  font-size: 15px;
`;

const KakaoIcon = styled(RiKakaoTalkFill)`
  margin-right: 8px;
  font-size: 21px;
  color: #f9e000;
`;

// Check & Find
const CheckContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 13px;
`;

const CheckBox = styled.div`
  display: flex;
  align-items: center;
`;

const CheckInput = styled.input`
  appearance: none;
  width: 16px;
  height: 16px;
  border: 1px solid ${props => props.theme.primary_04};
  border-radius: 1px;
  margin-right: 10px;
  cursor: pointer;

  &:checked {
    background-color: ${props => props.theme.primary_01};
    border-color: transparent;
    background-image: url('/svg/check.svg');
    background-size: 100% 100%;
    background-position: 50%;
    background-repeat: no-repeat;
  }
`;

const CheckLabel = styled.label``;

const FindMenu = styled.ul`
  display: flex;
`;

const FindItem = styled.li`
  position: relative;
  display: flex;
  align-items: center;
  padding: 0 8px;
  cursor: pointer;
  &:last-child {
    padding-right: 0;
    &:before {
      content: '';
      background-color: ${props => props.theme.primary_06};
      position: absolute;
      left: 0px;
      width: 1px;
      height: 13px;
    }
  }
`;

const JoinBtn = styled.button`
  // border: 1px solid black;
  width: 100%;
  height: 24px;
  color: ${props => props.theme.primary_06};
  text-decoration: underline;
`;
