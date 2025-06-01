import { useCallback, useState } from 'react';
import styled from 'styled-components';

// components
import JoinComponent from '@/component/Auth/JoinComponent';
import JoinGuide from '@/component/Auth/JoinGuide';
import ApplyBtn from '@/component/Common/Button/ApplyButton';

const JoinContainer = () => {
  // 이용약관 필수동의 state
  const [agreements, setAgreements] = useState({
    guidanceAgreed: false,
    personalInfoAgreed: false,
  });
  // 가입정보 state
  const [joinInfo, setJoinInfo] = useState({
    email: '',
    pwd: '',
    rePwd: '',
    name: '',
  });
  // 유효성 체크 state
  const [valid, setValid] = useState({
    email: false,
    pwd: false,
    rePwd: false,
    name: false,
  });
  // 정규식
  const regex: Record<string, RegExp> = {
    email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    pwd: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/, // 숫자, 대소문자 포함, 최소 8자
    name: /^[a-zA-Z가-힣]{2,}$/, // 한글과 영어만 및 최소 2자 이상
  };

  // join input form onchange
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

      setJoinInfo(prev => ({ ...prev, [name]: value }));
      setValid(prev => ({
        ...prev,
        [name]: regex[name]?.test(value) || (name === 'rePwd' && value === joinInfo.pwd),
      }));
    },
    [joinInfo, valid],
  );
  return (
    <JoinBase>
      <JoinComponent joinInfo={joinInfo} valid={valid} handleChange={handleChange} />
      <JoinGuide agreements={agreements} setAgreements={setAgreements} />
      <ApplyBtn disabled={Object.values(joinInfo).includes('') || !agreements.guidanceAgreed}>
        가입하기
      </ApplyBtn>
    </JoinBase>
  );
};

export default JoinContainer;

const JoinBase = styled.main`
  width: 100%;
  max-width: 450px;
  min-width: 280px;
  display: flex;
  justify-content: center;
  flex-flow: column;
  gap: 20px;
  margin: 0 auto;
  padding: 24px 16px;
`;
