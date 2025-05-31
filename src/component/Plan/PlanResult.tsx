import { useState } from 'react';
import styled from 'styled-components';
import Picker from '@emoji-mart/react';
//ifs
import { PlanProps } from '@/Interface/IPlan';
// components
import ApplyBtn from '../Common/Button/ApplyButton';
import dayjs from 'dayjs';

const PlanResult = ({ planInfo, setPlanInfo }: PlanProps) => {
  const [showPicker, setShowPicker] = useState(false);

  return (
    <ResultBase>
      <ResultBox>
        <ResultEmojiWrapper>
          <ResultEmoji onClick={() => setShowPicker(prev => !prev)}>{planInfo.emoji}</ResultEmoji>
          {showPicker && (
            <PickerWrapper>
              <Picker
                onEmojiSelect={(emoji: any) => {
                  setPlanInfo({
                    ...planInfo,
                    emoji: emoji.native,
                  });
                  setShowPicker(false);
                }}
              />
            </PickerWrapper>
          )}
        </ResultEmojiWrapper>

        <ResultH3>{planInfo.title}</ResultH3>
        <ResultMenu>
          <ResultItem>
            <ResultSubject>기간</ResultSubject>
            <ResultContent>
              {`${dayjs(planInfo.startDate).format('MM월 DD일')} ~ 
                ${dayjs(planInfo.endDate).format('MM월 DD일')} 
                `}
            </ResultContent>
          </ResultItem>
          <ResultItem>
            <ResultSubject>코스</ResultSubject>
            <ResultContent>{planInfo.course}</ResultContent>
          </ResultItem>
        </ResultMenu>
      </ResultBox>

      <ApplyBtn>플랜 시작</ApplyBtn>
    </ResultBase>
  );
};

export default PlanResult;

const ResultBase = styled.div`
  position: relative;
  width: 100%;
  height: calc(100% - 60px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  padding: 24px;
`;

const ResultBox = styled.div`
  background-color: ${props => props.theme.primary_08};
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px 16px 32px;
  border-radius: 12px;
`;

const ResultEmojiWrapper = styled.div`
  position: relative;
  width: fit-content;
  margin: 0 auto 8px;
`;

const ResultEmoji = styled.div`
  background: #fff;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  cursor: pointer;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: 10px;
    width: 6px;
    height: 6px;
    border: 1px solid ${props => props.theme.primary_01};
    border-left: 0;
    border-top: 0;
    transform: rotate(-315deg);
  }
`;

const PickerWrapper = styled.div`
  position: absolute;
  top: 80px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border-radius: 12px;
`;

const ResultH3 = styled.h3`
  text-align: center;
  font-size: 25px;
`;

const ResultMenu = styled.ul``;

const ResultItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  &:first-child {
    margin: 16px 0;
  }
`;

const ResultSubject = styled.span`
  color: ${props => props.theme.primary_06};
`;

const ResultContent = styled.span``;
