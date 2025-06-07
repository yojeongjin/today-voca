import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import Lottie from 'lottie-react';
import conffeti from '../../../public/json/confetti.json';
// ifs
import { CompleteProps } from '@/Interface/IComplete';

import CloseButton from '../Common/Button/CloseButton';
import ApplyBtn from '../Common/Button/ApplyButton';

// model
const MyCarrot = dynamic(() => import('@/component/Common/Model/Carrot'), { ssr: false });
const MyCorn = dynamic(() => import('@/component/Common/Model/Corn'), { ssr: false });
const MyEggplant = dynamic(() => import('@/component/Common/Model/Eggplant'), { ssr: false });
const MyTomato = dynamic(() => import('@/component/Common/Model/Tomato'), { ssr: false });
const MyRadish = dynamic(() => import('@/component/Common/Model/Radish'), { ssr: false });
const MyAvocado = dynamic(() => import('@/component/Common/Model/Avocado'), { ssr: false });

const PlanComplete = ({ setOpenBottom }: CompleteProps) => {
  const router = useRouter();

  const plantOptions = useMemo(
    () => [
      { text: '당근이 되었어요!', Component: <MyCarrot /> },
      { text: '옥수수가 되었어요!', Component: <MyCorn /> },
      { text: '가지가 되었어요!', Component: <MyEggplant /> },
      { text: '토마토가 되었어요!', Component: <MyTomato /> },
      { text: '무가 되었어요!', Component: <MyRadish /> },
      { text: '아보카도가 되었어요!', Component: <MyAvocado /> },
    ],
    [],
  );

  const randomPlant = useMemo(() => {
    const idx = Math.floor(Math.random() * plantOptions.length);
    return plantOptions[idx];
  }, [plantOptions]);

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
          <CompleteH4>매일 콩을 심었더니... {randomPlant.text}</CompleteH4>
          <CompleteP>다음엔 어떤 플랜을 심어볼까요?</CompleteP>

          <CompetePlant>{randomPlant.Component}</CompetePlant>

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
        새로운 플랜 심으러 가기
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

const CompetePlant = styled.div`
  // border: 1px solid black;
  width: 100%;
  display: flex;
  align-items: center;
  // min-height: 300px;
`;

const CompleteH4 = styled.h4`
  font-size: 20px;
  font-weight: 300;
`;

const CompleteP = styled.p`
  color: ${props => props.theme.primary_04};
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
