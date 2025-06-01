import { useRouter } from 'next/router';
import styled from 'styled-components';
// icons
import { RiCloseLargeLine } from 'react-icons/ri';
// components
import ApplyBtn from '@/component/Common/Button/ApplyButton';

interface JoinCompleteProps {
  setOpenBottom: React.Dispatch<React.SetStateAction<boolean>>;
}

const JoinComplete = ({ setOpenBottom }: JoinCompleteProps) => {
  const router = useRouter();
  return (
    <CompleteBase>
      <CloseBtn
        onClick={() => {
          setOpenBottom(false);
          router.push('/');
        }}
      >
        <RiCloseLargeLine />
      </CloseBtn>
      <CompleteH2>회원가입 완료</CompleteH2>
      <CompleteBody>
        <CompleteH4>회원가입을 완료했습니다!</CompleteH4>
        <CompleteP>지금 바로 공부를 시작해보세요.</CompleteP>
        <CompleteImg
          src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Hand%20gestures/Heart%20Hands%20Light%20Skin%20Tone.png"
          alt="Heart Hands Light Skin Tone"
        />
        <Confetti></Confetti>
      </CompleteBody>
      <ApplyBtn>로그인하기</ApplyBtn>
    </CompleteBase>
  );
};
export default JoinComplete;

const CompleteBase = styled.div`
  position: relative;
  padding: 24px 16px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  font-size: 16px;
`;

const CompleteH2 = styled.h2`
  font-weight: 500;
  font-size: 16px;
`;

const CompleteBody = styled.div`
  position: relative;
  &:before {
    content: '';
    background-image: url('/images/confetti.gif');
    position: absolute;
    left: 36px;
    width: 80%;
    height: 100%;
  }
`;

const CompleteH4 = styled.h4`
  font-size: 20px;
  font-weight: 300;
`;

const CompleteP = styled.p`
  color: ${props => props.theme.primary_05};
  font-size: 13px;
  margin-top: 8px;
`;

const CompleteImg = styled.img`
  width: 68px;
  height: 68px;
  z-index: 20;
`;

const Confetti = styled.div`
  background-image: url('/images/confetti.gif');
  height: 100;
`;
