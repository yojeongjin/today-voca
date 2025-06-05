import { useRouter } from 'next/router';
import styled from 'styled-components';

import Lottie from 'lottie-react';
import conffeti from '../../../public/json/confetti.json';
// ifs
import { CompleteProps } from '@/Interface/IComplete';

import CloseButton from '../Common/Button/CloseButton';
import ApplyBtn from '../Common/Button/ApplyButton';

const PlanComplete = ({ setOpenBottom }: CompleteProps) => {
  const router = useRouter();
  return (
    <CompleteBase>
      <CloseButton
        onClick={() => {
          setOpenBottom(false);
          router.push('/');
        }}
      />
      <CompleteH2>플랜 완료</CompleteH2>
      <CompleteBody>
        <CompleteContent>
          <CompleteH4>플랜을 완료했어요!</CompleteH4>
          <CompleteP>어쩌구 저쩌구 랄라라</CompleteP>

          <Confetti>
            <Lottie animationData={conffeti} loop={true} />
          </Confetti>
        </CompleteContent>
      </CompleteBody>
      <ApplyBtn
        onClick={() => {
          setOpenBottom(false);
          router.push('/');
        }}
      >
        닫기
      </ApplyBtn>
    </CompleteBase>
  );
};

export default PlanComplete;

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
  width: 100%;
  min-height: 250px;
`;

const CompleteContent = styled.div`
  position: absolute;
  width: 100%;
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

const Confetti = styled.div`
  position: absolute;
  top: -20px;
  left: 50%;
  width: 280px;
  transform: translateX(-50%);
`;
