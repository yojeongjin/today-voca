import styled from 'styled-components';
// components
import ApplyBtn from '../Common/Button/ApplyButton';

const PlanComponent = () => {
  return (
    <PlanBase>
      <NoPlanBox>
        <NoPlanI>📝</NoPlanI>
        <NoPlanP>아직 등록된 학습 플랜이 없어요.</NoPlanP>
        <ApplyBtn>플랜 등록하기</ApplyBtn>
      </NoPlanBox>
    </PlanBase>
  );
};

export default PlanComponent;

const PlanBase = styled.section`
  background-color: ${props => props.theme.primary_09};
  height: calc(100% - 50px);
  border-radius: 8px;
  padding: 16px;
`;

const NoPlanBox = styled.div`
  height: 100%;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 16px;
`;

const NoPlanI = styled.i`
  font-family: 'Tossface', sans-serif;
  font-size: 36px;
`;

const NoPlanP = styled.p`
  text-align: center;
  word-break: keep-all;
  overflow-wrap: break-word;
`;
