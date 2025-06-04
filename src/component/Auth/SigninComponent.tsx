import React, { useCallback, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { signin } from '@/redux/modules/auth';
import { useRouter } from 'next/router';
import styled from 'styled-components';
// icons
import { IoMailOutline, IoKeyOutline } from 'react-icons/io5';

// component
import ApplyBtn from '../Common/Button/ApplyButton';
import Main from '../Common/Lottie/Main';

const SigninComponent = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  // ref
  const idRef = useRef<HTMLInputElement>(null);
  const pwRef = useRef<HTMLInputElement>(null);
  // input state
  const [inputState, setInputState] = useState(false);

  // 로그인
  const signinHandler = useCallback(() => {
    const id = idRef.current?.value;
    const pw = pwRef.current?.value;

    const body = {
      email: id,
      pwd: pw,
    };
    dispatch(signin(body));
  }, [dispatch]);

  const handleOnKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      signinHandler();
    }
  };

  return (
    <SigninBase>
      <SigninContents>
        {/* logo */}
        <LogoBox>
          K
          <LottieWrapper>
            <Main />
          </LottieWrapper>
          NGLISH
        </LogoBox>

        {/* id input */}
        <InputWrapper>
          <InputLabel htmlFor="idInput">
            <Input
              id="idInput"
              type="text"
              required
              placeholder="&nbsp;"
              ref={idRef}
              autoComplete="off"
            />
            <InputSpan>
              <IdIcon />
              이메일을 입력해주세요.
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
              onKeyDown={e => handleOnKeyPress(e)}
            />
            <InputSpan>
              <PwIcon />
              비밀번호를 입력해주세요.
            </InputSpan>
          </InputLabel>
        </InputWrapper>
        {/* button */}
        <ApplyBtn disabled={!inputState} onClick={signinHandler}>
          로그인
        </ApplyBtn>
        <JoinBtn
          onClick={() => {
            router.push('/join');
          }}
        >
          이메일로 가입하기
        </JoinBtn>
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

// logo
const LogoBox = styled.div`
  position: relative;
  font-family: 'Fredoka';
  font-size: 46px;
  position: relative;
  color: ${props => props.theme.primary_01};
`;

const LottieWrapper = styled.span`
  display: inline-block;
  width: 44px;
  height: 44px;
  vertical-align: middle;
  position: relative;
  top: -10px;
  margin: 0 -4px 0 -6px;
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
height: 52px;
padding: 16px;
font-size:15px;
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

const JoinBtn = styled.button`
  width: 100%;
  height: 24px;
  color: ${props => props.theme.primary_06};
  text-decoration: underline;
  font-size: 14px;
`;
