import styled from 'styled-components';
import StepTitle from '../Common/Title/StepTitle';

const MypageComponent = () => {
  return (
    <MyBase>
      <StepTitle>설정</StepTitle>
    </MyBase>
  );
};

export default MypageComponent;

const MyBase = styled.div`
  height: 100%;
  padding: 0 24px;
  border: 1px solid black;
`;
