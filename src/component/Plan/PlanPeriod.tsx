import { useState } from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

// date-picker
import ReactDatePicker from 'react-datepicker';
import { ko } from 'date-fns/locale/ko';
import 'react-datepicker/dist/react-datepicker.css';
dayjs.locale('ko');

// components
import ApplyBtn from '../Common/Button/ApplyButton';

const PlanPeriod = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(dayjs(new Date()).add(1, 'month'));
  const onChange = (dates: any) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };
  return (
    <PeriodBase>
      {/* period */}
      <PeriodBox>
        <TotalTime>총 1개월</TotalTime>
        <PeriodMenu>
          <StartDay>
            <Start>{dayjs(startDate).format('MM월 D일 (dd)')}</Start>
            <Span>○</Span>
          </StartDay>
          <EndDay>
            <Span>●</Span>
            <End>{dayjs(endDate).format('MM월 D일 (dd)')}</End>
          </EndDay>
        </PeriodMenu>
      </PeriodBox>
      {/* calendar */}
      <PeriodCalendar>
        <ReactDatePicker
          dateFormat="yyyy.MM.dd"
          locale={ko} // 한국말
          selected={startDate}
          onChange={onChange}
          startDate={startDate}
          endDate={endDate}
          minDate={new Date()}
          selectsRange
          inline
          disabledKeyboardNavigation
        />
      </PeriodCalendar>
      {/* button */}
      <BtnBox>
        <ApplyBtn color="#027FFF">확인</ApplyBtn>
      </BtnBox>
    </PeriodBase>
  );
};

export default PlanPeriod;

const PeriodBase = styled.section`
  position: relative;
  padding: 16px 0 0;
`;

const PeriodBox = styled.div`
  padding: 0 16px;
  border-bottom: 5px solid ${props => props.theme.primary_08};
`;

const TotalTime = styled.div`
  margin: 25px 0 2px;
  text-align: center;
  color: ${props => props.theme.primary_03};
  font-size: 14px;
`;

const PeriodMenu = styled.div`
  position: relative;
  display: flex;
  margin: 0 0 24px;
`;

const StartDay = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  &::after {
    content: '';
    height: 1px;
    flex-grow: 1;
    border-top: 1px dashed ${props => props.theme.primary_07};
    margin-left: 10px;
  }
`;

const EndDay = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  &::before {
    content: '';
    height: 1px;
    flex-grow: 1;
    border-top: 1px dashed ${props => props.theme.primary_07};
    margin-right: 10px;
  }
`;

const Start = styled.span`
  font-weight: 500;
  margin-right: 10px;
`;

const End = styled(Start)`
  margin: 0 0 0 10px;
`;

const Span = styled.span`
  font-size: 13px;
  color: ${props => props.theme.primary_01};
`;

const PeriodCalendar = styled.div`
  font-family: 'Pretendard', sans-serif;
  max-height: 450px;
  padding-top: 8px;
  overflow-y: scroll;
  .react-datepicker {
    font-family: 'Pretendard', sans-serif;
    width: 100%;
    border: none;
  }

  .react-datepicker__month-container {
    width: 100%;
    margin: 0 auto;
  }

  .react-datepicker-popper .react-datepicker__triangle {
    fill: #fff;
    color: transparent;
    stroke: black;
  }
  .react-datepicker__header {
    background: transparent;
    border: none;
  }
  .react-datepicker__navigation {
    top: 12px;
    .react-datepicker__navigation-icon {
      &::before {
        border-width: 2px 2px 0 0;
      }
    }
    &.react-datepicker__navigation--previous,
    &.react-datepicker__navigation--next {
      top: 8px;
    }
  }
  .react-datepicker__current-month {
    font-family: 'Pretendard', sans-serif;
    font-weight: 300;
    font-size: 17px;
    padding: 5px 35px;
    // text-align: left;
  }
  .react-datepicker__day-names {
    font-family: 'Pretendard', sans-serif;
    font-weight: 300;
    font-size: 14px;
    display: flex;
    margin: 20px 0.4rem 0;
  }
  .react-datepicker__day-name {
    margin: 0 auto;
    color: ${props => props.theme.primary_03};
  }
  .react-datepicker__month {
    margin-top: -5px;
  }
  .react-datepicker__week {
    display: flex;
    margin: 4px 0;
    > .react-datepicker__day {
      font-family: 'Pretendard', sans-serif;
      font-weight: 300;
      font-size: 14px;
    }
  }

  .react-datepicker__day {
    position: relative;
    display: block;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    aspect-ratio: 1 / 1;
    margin: 0 auto;
    overflow: visible;
  }
  .react-datepicker__day--selected {
    background: #027fff !important;
    color: #fff !important;
    border-radius: 50% !important;
  }
  .react-datepicker__day--in-selecting-range {
    background-color: #f7f7f7;
    color: #212529;
  }

  .react-datepicker__day--in-selecting-range:not([aria-disabled='true']):hover {
    background: #027fff;
    color: #fff;
    border-radius: 50%;
  }

  .react-datepicker__day--in-range {
    background-color: #f7f7f7;
    color: #212529;
    border-radius: 0;

    &.react-datepicker__day--range-start,
    &.react-datepicker__day--range-end {
      position: relative;
      background: #027fff;
      color: #fff;
      font-weight: 400;
      border-radius: 50%;
    }

    &.react-datepicker__day--today {
      background: transparent;
      color: #027fff;
      &.react-datepicker__day--range-start {
        &:before {
          display: none;
        }
      }
    }
  }

  .react-datepicker__day--in-range:hover {
    background-color: #f7f7f7;
    border-radius: 0;
    &.react-datepicker__day--range-start,
    &.react-datepicker__day--range-end {
      background: #027fff;
      border-radius: 50%;
    }
  }

  .react-datepicker__day--disabled:hover {
    background: transparent;
    // background: #027fff;
  }
`;

const BtnBox = styled.div`
  padding: 16px 8px;
`;
