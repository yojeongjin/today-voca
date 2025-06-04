import { useReducer, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { DayProps } from '@/Interface/IDay';

// components
import ApplyBtn from '../Common/Button/ApplyButton';
import Happy from '../Common/Lottie/Happy';

interface PracticeState {
  stage: -1 | 0 | 1 | 2; // -1: 잠금, 0: 준비, 1: 진행, 2: 결과
  count: number;
  timer: number;
  currentIndex: number;
  answerList: string[];
  answer: string;
}

type PracticeAction =
  | { type: 'TICK_COUNT' }
  | { type: 'START_TEST' }
  | { type: 'TICK_TIMER' }
  | { type: 'SUBMIT_ANSWER'; payload: string }
  | { type: 'NEXT_QUESTION' }
  | { type: 'FINISH_TEST' }
  | { type: 'SET_ANSWER'; payload: string }
  | { type: 'LOCK_STAGE' };

const initialState: PracticeState = {
  stage: 0,
  count: 3,
  timer: 0,
  currentIndex: 0,
  answerList: [],
  answer: '',
};

const reducer = (state: PracticeState, action: PracticeAction): PracticeState => {
  switch (action.type) {
    case 'TICK_COUNT':
      return { ...state, count: state.count - 1 };
    case 'START_TEST':
      return { ...state, stage: 1, timer: 5 };
    case 'TICK_TIMER':
      return { ...state, timer: state.timer - 1 };
    case 'SET_ANSWER':
      return { ...state, answer: action.payload };
    case 'SUBMIT_ANSWER':
      return {
        ...state,
        answerList: [...state.answerList, action.payload],
        answer: '',
      };
    case 'NEXT_QUESTION':
      return { ...state, currentIndex: state.currentIndex + 1 };
    case 'FINISH_TEST':
      return { ...state, stage: 2 };
    case 'LOCK_STAGE':
      return { ...state, stage: -1 };
    default:
      return state;
  }
};

interface Practice3Props extends DayProps {
  handleFinish: () => void;
}

const Practice3 = ({ dayData, handleFinish }: Practice3Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const inputRef = useRef<HTMLInputElement>(null);
  const countId = useRef<NodeJS.Timeout | null>(null);
  const timerId = useRef<NodeJS.Timeout | null>(null);

  const vocaList = dayData.map(data => data.word);

  useEffect(() => {
    if (state.stage !== 0) return;
    countId.current = setInterval(() => {
      dispatch({ type: 'TICK_COUNT' });
    }, 500);
    return () => {
      if (countId.current) clearInterval(countId.current);
    };
  }, [state.stage]);

  useEffect(() => {
    if (state.count <= 0 && state.stage === 0) {
      countId.current && clearInterval(countId.current);
      dispatch({ type: 'START_TEST' });
    }
  }, [state.count, state.stage]);

  useEffect(() => {
    if (state.stage !== 1) return;
    timerId.current = setInterval(() => {
      dispatch({ type: 'TICK_TIMER' });
    }, 500);
    return () => {
      if (timerId.current) clearInterval(timerId.current);
    };
  }, [state.stage]);

  useEffect(() => {
    if (state.stage === 1 && state.timer <= 0) {
      handleSubmit();
    }
  }, [state.timer, state.stage]);

  useEffect(() => {
    if (state.stage === 1) {
      inputRef.current?.focus();
    }
  }, [state.currentIndex, state.stage]);

  const handleSubmit = () => {
    if (state.stage !== 1) return;

    dispatch({ type: 'LOCK_STAGE' });
    dispatch({ type: 'SUBMIT_ANSWER', payload: state.answer });

    if (state.currentIndex + 1 >= vocaList.length) {
      dispatch({ type: 'FINISH_TEST' });
    } else {
      setTimeout(() => {
        dispatch({ type: 'NEXT_QUESTION' });
        dispatch({ type: 'START_TEST' });
      }, 100);
    }
  };

  return (
    <PracticeBase>
      {state.stage === 0 && (
        <>
          <CountContent>
            <Happy />
          </CountContent>
          <CountP>
            <Count>{state.count}</Count>초 뒤에 테스트가 시작됩니다!
          </CountP>
        </>
      )}

      {state.stage === 1 && (
        <RepeatContent>
          <TimerBox>
            <Time>{state.timer}</Time>
          </TimerBox>
          <ContentBox>
            <Question>{vocaList[state.currentIndex]}</Question>
            <AnswerInput
              ref={inputRef}
              placeholder="정답을 입력해주세요."
              value={state.answer}
              onChange={e => dispatch({ type: 'SET_ANSWER', payload: e.target.value })}
              onKeyUp={e => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  timerId.current && clearInterval(timerId.current);
                  handleSubmit();
                }
              }}
              autoComplete="off"
            />
          </ContentBox>
        </RepeatContent>
      )}

      {state.stage === 2 && (
        <AnswerBox>
          <AnswerTitle>
            <TitleImg
              src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Telegram-Animated-Emojis/main/Animals%20and%20Nature/Fire.webp"
              alt="Fire"
            />
            정답을 확인하세요
          </AnswerTitle>
          <AnswerMenu>
            <AnswerItem>
              <ItemTitle>단어</ItemTitle>
              <ItemTitle>뜻</ItemTitle>
              <ItemTitle>나의 답안</ItemTitle>
            </AnswerItem>
            {state.answerList.map((userAnswer, idx) => (
              <AnswerItem key={idx}>
                <ItemQuestion>{dayData[idx].word}</ItemQuestion>
                <ItemAnswer>
                  {dayData[idx].meaning2
                    ? `${dayData[idx].meaning1}, ${dayData[idx].meaning2}`
                    : dayData[idx].meaning1}
                </ItemAnswer>
                <ItemUserAnswer>{userAnswer}</ItemUserAnswer>
              </AnswerItem>
            ))}
          </AnswerMenu>
          <ApplyBtn onClick={handleFinish}>테스트 종료</ApplyBtn>
        </AnswerBox>
      )}
    </PracticeBase>
  );
};

export default Practice3;

const PracticeBase = styled.div`
  width: 100%;
  height: calc(100% - 35px);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 16px 24px;
`;

const CountContent = styled.div`
  background-color: ${props => props.theme.primary_08};
  position: relative;
  width: 135px;
  height: 135px;
  margin-bottom: 24px;
  border-radius: 50%;
`;

const CountP = styled.p`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 300;
  font-size: 16px;
  color: ${props => props.theme.primary_04};
`;

const Count = styled.strong`
  font-size: 16px;
  font-weight: 700;
  color: ${props => props.theme.primary_01};
  margin-right: 4px;
`;

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
`;

const Question = styled.p`
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

const AnswerBox = styled.div`
  width: 100%;
  height: 100%;
`;

const AnswerTitle = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 6px;
  font-size: 16px;
  font-weight: 500;
`;

const TitleImg = styled.img`
  width: 20px;
  height: 20px;
`;

const AnswerMenu = styled.ul`
  height: calc(100% - 100px);
  margin-bottom: 8px;
  padding-bottom: 8px;
  overflow-y: scroll;
`;

const AnswerItem = styled.li`
  display: flex;
  border-bottom: 1px dashed ${props => props.theme.primary_07};
  &:first-child {
    background-color: ${props => props.theme.primary_08};
    border-radius: 12px 12px 0 0;
  }
  &:first-child,
  &:last-child {
    border: none;
  }
`;

const ItemTitle = styled.h4`
  flex: 1;
  padding: 12px 0;
  text-align: center;
  color: ${props => props.theme.primary_04};
`;

const ItemQuestion = styled(ItemTitle)`
  color: ${props => props.theme.primary_03};
`;

const ItemAnswer = styled(ItemTitle)`
  color: ${props => props.theme.primary_03};
`;

const ItemUserAnswer = styled(ItemTitle)`
  color: ${props => props.theme.primary_03};
`;
