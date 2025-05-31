import styled from 'styled-components';

const Practice3 = () => {
  return (
    <PracticeBase>
      {/* count */}
      {/* <CountContent>
        1
        <CountImg src="/images/mortarboard.png" alt="test" />
      </CountContent> */}
      {/* repeat */}
      <RepeatContent>
        <TimerBox>
          <Time>5</Time>
        </TimerBox>
        <ContentBox>
          <Question>foundation</Question>
          <AnswerInput placeholder="정답 입력" />
        </ContentBox>
      </RepeatContent>
    </PracticeBase>
  );
};

export default Practice3;

const PracticeBase = styled.div`
  // background-color: ${props => props.theme.primary_08};
  // height: calc(var(--vh, 1vh) * 100 - 60px);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 24px;
`;
// count
const CountContent = styled.div`
  background-color: ${props => props.theme.primary_09};
  position: relative;
  width: 135px;
  height: 135px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 45px;
  font-weight: 700;
  border-radius: 50%;
`;

const CountImg = styled.img`
  position: absolute;
  top: -35px;
  right: -12px;
  width: 80%;
  transform: rotate(5deg);
`;
// repeat
const RepeatContent = styled.div`
  background-color: ${props => props.theme.primary_08};
  width: 100%;
  height: 500px;
  padding: 24px 24px 0;
  margin-bottom: 36px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.01);
  border-radius: 12px;
`;

const TimerBox = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

const Time = styled.span`
  background-color: #fff;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: ${props => props.theme.primary_03};
  font-weight: 500;
  font-size: 16px;
`;

const ContentBox = styled.div`
  width: 100%;
  height: calc(100% - 60px);
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 24px;
  // border: 1px solid black;
`;

const Question = styled.p`
  // padding: 42px 0;
  text-align: center;
  font-weight: 600;
  font-size: 32px;
  color: ${props => props.theme.primary_01};
`;

const AnswerInput = styled.input`
  background-color: #ebebeb;
  width: 100%;
  height: 52px;
  padding: 16px;
  font-size: 17px;
  text-align: center;
  border-radius: 12px;
`;
