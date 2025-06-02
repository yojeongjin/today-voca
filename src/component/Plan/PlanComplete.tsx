import styled from 'styled-components';
// components
import CloseButton from '../Common/Button/CloseButton';

const PlanComplete = () => {
  return (
    <CompleteBase>
      <CloseButton />
      <CompleteH2>플랜 생성 완료</CompleteH2>

      <CompleteBody>
        <CompleteH4>플랜 심기 완료</CompleteH4>
        <CompleteP>이제 콩이를 잘 키워주세요!</CompleteP>
      </CompleteBody>
    </CompleteBase>
  );
};

export default PlanComplete;

const CompleteBase = styled.section`
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
