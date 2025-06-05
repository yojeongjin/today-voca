import styled from 'styled-components';
import { PlanData } from '@/Interface/IPlan';

// components
import StepTitle from '../Common/Title/StepTitle';
import H4 from '../Common/Title/H4';
import dayjs from 'dayjs';

const MypageComponent = ({ planData }: PlanData) => {
  return (
    <MyBase>
      <StepTitle>내 플랜 관리</StepTitle>

      {planData.map(data =>
        data.state === 'PROGRESS' ? (
          <>
            {/* 진행중 */}
            <H4>진행 중 플랜</H4>
            <Progress>
              <EmojiBox>{data.emoji}</EmojiBox>
              <ProgressInfo>
                <ProgressTitle>{data.title}</ProgressTitle>
                <PeriodMenu>
                  <PeriodItem>
                    <Period>
                      {`${dayjs(data.plan_from).format('M.D')} ~ ${dayjs(data.plan_to).format('M.D')}`}
                    </Period>
                  </PeriodItem>
                  <PeriodItem>
                    <RemainPeriod>
                      {dayjs(data.plan_to).diff(dayjs(data.plan_from), 'day')}일 남음
                    </RemainPeriod>
                  </PeriodItem>
                  <RemainPeriod></RemainPeriod>
                </PeriodMenu>
              </ProgressInfo>
            </Progress>
          </>
        ) : (
          <>
            {/* 지난 플랜 */}
            <H4>지난 플랜</H4>
            <PrevMenu>
              <PrevItem>
                <PrevEmoji>{data.emoji}</PrevEmoji>
                <ProgressTitle>{data.title}</ProgressTitle>
                <PrevPeriod>
                  {`${dayjs(data.plan_from).format('M.D')} ~ ${dayjs(data.plan_to).format('M.D')}`}
                </PrevPeriod>
              </PrevItem>
            </PrevMenu>
          </>
        ),
      )}
    </MyBase>
  );
};

export default MypageComponent;

const MyBase = styled.main`
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: 100%;
  padding: 0 24px;
`;

const Progress = styled.div`
  background-color: ${props => props.theme.primary_08};
  position: relative;
  display: flex;
  align-items: center;
  padding: 16px;
  margin-bottom: 16px;
  border-radius: 8px;
  &:after {
    content: '';
    position: absolute;
    top: 40%;
    right: 20px;
    width: 7px;
    height: 7px;
    border: 2px solid ${props => props.theme.primary_06};
    border-left: 0;
    border-top: 0;
    transform: rotate(315deg);
  }
`;

const EmojiBox = styled.span`
  display: block;
  margin-right: 16px;
  font-size: 24px;
`;

const ProgressInfo = styled.div``;

const ProgressTitle = styled.p`
  font-weight: 500;
  word-break: keep-all;
  overflow-wrap: break-word;
  font-size: 15px;
`;

const PeriodMenu = styled.ul`
  display: flex;
  margin-top: 4px;
  font-weight: 300;
  font-size: 12px;
  color: ${props => props.theme.primary_05};
`;

const PeriodItem = styled.li`
  position: relative;
  padding-right: 12px;
  &:first-child {
    &:after {
      content: '';
      position: absolute;
      top: 3px;
      right: 6px;
      background-color: ${props => props.theme.primary_06};
      width: 1px;
      height: 11px;
    }
  }
`;

const Period = styled.span``;

const RemainPeriod = styled.span`
  color: ${props => props.theme.primary_01};
`;

const PrevMenu = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
`;

const PrevItem = styled.li`
  background-color: ${props => props.theme.primary_08};
  width: 150px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 16px;
  border-radius: 8px;
`;

const PrevEmoji = styled(EmojiBox)`
  font-size: 16px;
`;

const PrevPeriod = styled.span`
  color: ${props => props.theme.primary_05};
  font-size: 13px;
`;
