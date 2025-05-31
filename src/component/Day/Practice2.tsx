import styled from 'styled-components';

const Practice2 = () => {
  return (
    <PracticeBase>
      {/* step */}
      <StateMenu>
        <StateItem>
          <StateCategory>Total</StateCategory>
          <State>77</State>
        </StateItem>
        <StateItem>
          <StateCategory>Great</StateCategory>
          <State>6</State>
        </StateItem>
        <StateItem>
          <StateCategory>%</StateCategory>
          <State>77</State>
        </StateItem>
      </StateMenu>
      {/* 문제 */}
      <Question>Initiate</Question>
      {/* 정답 */}
      <AnswerMenu>
        <AnswerItem>좋아하다</AnswerItem>
        <AnswerItem>앞으로 나아가다</AnswerItem>
        <AnswerItem>착수시키다</AnswerItem>
        <AnswerItem>배고프다</AnswerItem>
      </AnswerMenu>
    </PracticeBase>
  );
};

export default Practice2;

const PracticeBase = styled.div`
  display: flex;
  gap: 24px;
  flex-direction: column;
  padding: 8px 24px;
  // border: 1px solid black;
`;

const StateMenu = styled.ul`
  display: flex;
`;

const StateItem = styled.li`
  flex: 1;
  text-align: center;
  line-height: 1.6;
`;

const StateCategory = styled.h4`
  color: ${props => props.theme.primary_06};
  font-weight: 300;
  font-size: 13px;
`;

const State = styled.p`
  font-weight: 500;
`;

const Question = styled.div`
  background-color: ${props => props.theme.primary_08};
  height: calc(var(--vh, 1vh) * 100 - 430px);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  font-weight: 600;
  font-size: 20px;
`;

const AnswerMenu = styled.ul``;

const AnswerItem = styled.li`
  padding: 16px 0;
  border: 1px solid ${props => props.theme.primary_06};
  border-radius: 8px;
  text-align: center;
  margin-bottom: 16px;
  &:last-child {
    margin-bottom: 0;
  }
`;
