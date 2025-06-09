import styled from 'styled-components';

import BottomSheet from '../Common/BottomSheet/BottomSheet';
import ApplyBtn from '../Common/Button/ApplyButton';
import Jumping from '../Common/Lottie/Jumping';

interface Props {
  onInstall: () => void;
  onCancel: () => void;
}

const A2HS = ({ onInstall, onCancel }: Props) => {
  return (
    <BottomSheet height={480} isOpen={true}>
      <A2HSBase>
        <CompleteH2>홈 화면 추가</CompleteH2>
        <CompleteBody>
          <CompleteH4>홈 화면에 콩글리시를 심어보세요!</CompleteH4>
          <CompleteP>한 번의 터치로 매일 단어 학습을 할 수 있어요 🌱</CompleteP>
        </CompleteBody>
        <CompleteImg>
          <Jumping />
        </CompleteImg>
        <ApplyBtn onClick={onInstall}>추가하기</ApplyBtn>
        <CancelBtn onClick={onCancel}>나중에</CancelBtn>
      </A2HSBase>
    </BottomSheet>
  );
};

export default A2HS;

const A2HSBase = styled.div`
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

const CompleteImg = styled.div`
  width: 80%;
  margin: 0 auto;
`;

const CancelBtn = styled.button`
  width: 100%;
  height: 24px;
  color: ${props => props.theme.primary_06};
  text-decoration: underline;
  font-size: 14px;
`;
