import { useCallback, useMemo, useState } from 'react';
import styled, { keyframes, css } from 'styled-components';

import { useBottom } from '@/hooks/useBottom';
import { DayProps } from '@/Interface/IDay';

import BottomSheet from '../Common/BottomSheet/BottomSheet';
import PracticeComplete from './PracticeComplete';

const Practice2 = ({ onNext, dayData }: DayProps) => {
  const { openBottom, setOpenBottom } = useBottom();
  const [answer, setAnswer] = useState<string | null>(null);
  const [great, setGreat] = useState<number>(0);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const currentWord = dayData[currentIdx];

  const { question, choices, correct } = useMemo(() => {
    const correct = currentWord?.meaning1;

    const wrongs = dayData
      .filter((data, idx) => idx !== currentIdx && data.meaning1)
      .map(data => data.meaning1); // 정답 제외

    const shuffledWrong = wrongs.sort(() => Math.random() - 0.5).slice(0, 3);
    const allChoices = [...shuffledWrong, correct].sort(() => Math.random() - 0.5);

    return {
      question: currentWord?.word,
      choices: allChoices,
      correct,
    };
  }, [currentWord, currentIdx, dayData]);

  const handleNext = useCallback(
    (choice: string) => {
      setAnswer(choice);
      if (correct === choice) {
        setGreat(prev => prev + 1);
      }

      setTimeout(() => {
        if (currentIdx < dayData.length - 1) {
          setCurrentIdx(prev => prev + 1);
          setAnswer(null);
        } else {
          setOpenBottom(true);
        }
      }, 1000);
    },
    [correct, currentIdx, dayData.length, onNext],
  );

  const percentage = useMemo(() => {
    return ((great / dayData.length) * 100).toFixed(0);
  }, [great]);

  return (
    <>
      <PracticeBase>
        {/* step */}
        <StateMenu>
          <StateItem>
            <StateCategory>Total</StateCategory>
            <State>{dayData.length}</State>
          </StateItem>
          <StateItem>
            <StateCategory>Great</StateCategory>
            <State>{great}</State>
          </StateItem>
          <StateItem>
            <StateCategory>%</StateCategory>
            <State>{percentage}%</State>
          </StateItem>
        </StateMenu>
        {/* 문제 */}
        <Question>{question}</Question>
        {/* 정답 */}
        <AnswerMenu>
          {choices.map((choice, idx) => {
            const isCorrect = answer === choice && choice === correct;
            const isWrong = answer === choice && choice !== correct;

            return (
              <AnswerItem
                key={idx}
                isCorrect={isCorrect}
                isWrong={isWrong}
                onClick={() => {
                  handleNext(choice!);
                }}
              >
                {choice}
              </AnswerItem>
            );
          })}
        </AnswerMenu>
      </PracticeBase>
      <BottomSheet
        height={500}
        isOpen={openBottom}
        onClose={() => {
          setOpenBottom(false);
        }}
      >
        <PracticeComplete
          handleComplete={() => onNext?.()}
          setOpenBottom={setOpenBottom}
          percentage={Number(percentage)}
        />
      </BottomSheet>
    </>
  );
};

export default Practice2;

const shake = keyframes`
  0% { transform: translateX(0); }
  20% { transform: translateX(-10px); }
  40% { transform: translateX(10px); }
  60% { transform: translateX(-8px); }
  80% { transform: translateX(8px); }
  100% { transform: translateX(0); }
`;

const PracticeBase = styled.div`
  position: relative;
  height: calc(100% - 70px);
  display: flex;
  gap: 24px;
  flex-direction: column;
  padding: 6px 24px;
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
  height: calc(var(--vh, 1vh) * 100 - 440px);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  font-weight: 600;
  font-size: 20px;
`;

const AnswerMenu = styled.ul``;

const AnswerItem = styled.li<{
  isCorrect: string | boolean | null;
  isWrong: string | boolean | null;
}>`
  background-color: ${props =>
    props.isCorrect ? '#f2f8ff' : props.isWrong ? '#fcf1f3' : 'transparent'};
  margin-bottom: 16px;
  padding: 16px 0;
  border: 1px solid
    ${props => (props.isCorrect ? '#027FFF' : props.isWrong ? '#c64657' : '#ADB5BD')};
  border-radius: 8px;
  color: ${props => (props.isCorrect ? '#027FFF' : props.isWrong ? '#c64657' : '#212529')};
  font-weight: ${props => (props.isCorrect || props.isWrong ? '500' : '400')};

  text-align: center;
  cursor: pointer;
  ${props =>
    props.isWrong &&
    css`
      animation: ${shake} 0.4s ease-in-out;
    `}
  &:last-child {
    margin-bottom: 0;
  }
`;
