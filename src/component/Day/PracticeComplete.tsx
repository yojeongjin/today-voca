import { useRouter } from 'next/router';
import styled from 'styled-components';

import { CompleteProps } from '@/Interface/IComplete';

import CloseButton from '../Common/Button/CloseButton';
import ApplyBtn from '../Common/Button/ApplyButton';
import Neutral from '../Common/Lottie/Neutral';
import Angry from '../Common/Lottie/Angry';
import Delighted from '../Common/Lottie/Delighted';

interface PracticeProps extends CompleteProps {
  percentage: number;
}

const PracticeComplete = ({ handleComplete, setOpenBottom, percentage }: PracticeProps) => {
  const router = useRouter();

  return (
    <CompleteBase>
      <CloseButton
        onClick={() => {
          setOpenBottom(false);
          router.push('/');
        }}
      />
      <CompleteH2>학습 완료</CompleteH2>
      <CompleteBody>
        <CompleteH4>오늘 학습을 완료했어요!</CompleteH4>
        <CompleteP>반복 테스트를 통해서 실력을 업그레이드 시켜보세요</CompleteP>

        {percentage < 30 ? (
          <CompleteImgBox>
            <CompleteImg>
              <Angry />
            </CompleteImg>
            <CompleteSpan percentage={percentage}>조금 더 분발해보아요</CompleteSpan>
          </CompleteImgBox>
        ) : percentage < 70 ? (
          <CompleteImgBox>
            <CompleteImg>
              <Neutral />
            </CompleteImg>
            <CompleteSpan percentage={percentage}>아쉬워요</CompleteSpan>
          </CompleteImgBox>
        ) : (
          <CompleteImgBox>
            <CompleteImg>
              <Delighted />
            </CompleteImg>
            <CompleteSpan percentage={percentage}>잘했어요!</CompleteSpan>
          </CompleteImgBox>
        )}
      </CompleteBody>

      <ApplyBtn onClick={handleComplete}>다음 가기</ApplyBtn>
    </CompleteBase>
  );
};

export default PracticeComplete;

const CompleteBase = styled.div`
  position: relative;
  padding: 24px 16px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const CompleteH2 = styled.h2`
  font-weight: 500;
  font-size: 16px;
`;

const CompleteBody = styled.div`
  position: relative;
  &:before {
    content: '';
    background-image: url('/gif/confetti.gif');
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

const CompleteImgBox = styled.div`
  margin: 16px 0 8px;
`;

const CompleteImg = styled.div`
  width: 68px;
  height: 68px;
  margin: 0 auto;
`;

const CompleteSpan = styled.span<{ percentage: number }>`
  display: block;
  color: ${props =>
    props.percentage < 30 ? '#ff5252' : props.percentage < 70 ? '#ffbf3e' : '#6ecc64'};
  font-weight: 500;
`;
