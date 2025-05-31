import styled from 'styled-components';
import ApplyBtn from '../Common/Button/ApplyButton';
import { NextStepProps } from '@/Interface/Istep';

const Practice1 = ({ onNext }: NextStepProps) => {
  return (
    <PracticeBase>
      <WordMenu>
        <WordItem>
          <Word>Postpone</Word>
          <Pronunciation>[pouspuomnt]</Pronunciation>
          <Meaning>V. 연기, 뒤로 미루기</Meaning>
        </WordItem>
        <WordItem>
          <Word>Postpone</Word>
          <Pronunciation>[pouspuomnt]</Pronunciation>
          <Meaning>V. 연기, 뒤로 미루기</Meaning>
        </WordItem>
        <WordItem>
          <Word>Postpone</Word>
          <Pronunciation>[pouspuomnt]</Pronunciation>
          <Meaning>V. 연기, 뒤로 미루기</Meaning>
        </WordItem>
        <WordItem>
          <Word>Postpone</Word>
          <Pronunciation>[pouspuomnt]</Pronunciation>
          <Meaning>V. 연기, 뒤로 미루기</Meaning>
        </WordItem>{' '}
        <WordItem>
          <Word>Postpone</Word>
          <Pronunciation>[pouspuomnt]</Pronunciation>
          <Meaning>V. 연기, 뒤로 미루기</Meaning>
        </WordItem>{' '}
        <WordItem>
          <Word>Postpone</Word>
          <Pronunciation>[pouspuomnt]</Pronunciation>
          <Meaning>V. 연기, 뒤로 미루기</Meaning>
        </WordItem>{' '}
        <WordItem>
          <Word>Postpone</Word>
          <Pronunciation>[pouspuomnt]</Pronunciation>
          <Meaning>V. 연기, 뒤로 미루기</Meaning>
        </WordItem>
      </WordMenu>

      <ApplyBtn onClick={onNext}>다음</ApplyBtn>
    </PracticeBase>
  );
};

export default Practice1;

const PracticeBase = styled.div`
  height: calc(var(--vh, 1vh) * 100 - 75px);
  padding: 8px 24px;
`;

const WordMenu = styled.ul`
  height: calc(100% - 60px);
  overflow-y: scroll;
  margin-bottom: 8px;
`;

const WordItem = styled.li`
  margin-bottom: 16px;
`;

const Word = styled.h4`
  font-weight: 700;
  font-size: 18px;
`;

const Pronunciation = styled.span`
  font-size: 13px;
  color: ${props => props.theme.primary_06};
`;

const Meaning = styled.p`
  background-color: ${props => props.theme.primary_08};
  margin-top: 4px;
  padding: 12px 8px;
  border-radius: 8px;
`;
