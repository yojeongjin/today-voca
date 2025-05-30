import styled from 'styled-components';
// icons
import { FaFileAlt, FaCalendarDay } from 'react-icons/fa';
// components
import BottomButton from '../Common/Button/BottomButton';
// ifs
import { NextStepProps } from '@/Interface/Istep';
import BottomSheet from '../Common/BottomSheet/BottomSheet';
import PlanPeriod from './PlanPeriod';
import { useState } from 'react';
import ApplyBtn from '../Common/Button/ApplyButton';
const PlanTitle = ({ onNext }: NextStepProps) => {
  const [openBottom, setOpenBottom] = useState<boolean>(false);
  return (
    <CreateBase>
      {/* head */}
      <PlanHead>
        <PlanH4>
          <PlanStrong>플랜 이름과 기간을</PlanStrong>
          <br></br>입력해주세요
        </PlanH4>
      </PlanHead>
      {/* input */}
      <PlanContents>
        <PlanInputBox>
          <InputIcon />
          <PlanInput placeholder="플랜 이름" />
        </PlanInputBox>

        {/* calendar */}
        <PeriodCalendar
          onClick={() => {
            setOpenBottom(true);
          }}
        >
          <CalendarIcon />
          <CalendarP>시작일 - 종료일</CalendarP>
        </PeriodCalendar>
      </PlanContents>

      {openBottom && (
        <BottomSheet
          height={580}
          isOpen={openBottom}
          onClose={() => {
            setOpenBottom(false);
          }}
        >
          <PlanPeriod />
        </BottomSheet>
      )}

      {/* button */}
      <BtnBox>
        <ApplyBtn onClick={onNext}>다음</ApplyBtn>
      </BtnBox>
    </CreateBase>
  );
};

export default PlanTitle;

const CreateBase = styled.section`
  position: relative;
  height: 100%;
  padding-top: 24px;
`;

const PlanHead = styled.div`
  padding: 24px;
`;

const PlanH4 = styled.h4`
  font-size: 24px;
  font-weight: 200;
`;

const PlanStrong = styled.strong`
  font-weight: 500;
`;

const PlanContents = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 0 24px;
`;

const PlanInputBox = styled.div`
  background-color: ${props => props.theme.primary_08};
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
  padding: 0 24px;
  border-radius: 12px;
  padding: 0 16px;
`;

const InputIcon = styled(FaFileAlt)`
  font-size: 16px;
  color: ${props => props.theme.primary_06};
`;

const PlanInput = styled.input`
  background-color: transparent;
  width: calc(100% - 16px);
  margin-left: 12px;
  font-size: 17px;
  &::placeholder {
    color: ${props => props.theme.primary_06};
    font-size: 17px;
  }
`;

// calendar
const PeriodCalendar = styled(PlanInputBox)`
  color: ${props => props.theme.primary_06};
`;

const CalendarIcon = styled(FaCalendarDay)`
  font-size: 16px;
  color: ${props => props.theme.primary_06};
`;

const CalendarP = styled.p`
  // width: calc(100% - 16px);
  margin-left: 18px;
  font-size: 17px;
`;

const BtnBox = styled.div`
  position: absolute;
  bottom: 20px;
  width: 100%;
  padding: 16px 24px;
`;
