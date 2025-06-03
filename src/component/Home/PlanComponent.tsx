import { useMemo } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import dayjs from 'dayjs';
// ifs
import { PlanData } from '@/Interface/IPlan';
// components
import ApplyBtn from '../Common/Button/ApplyButton';
import H2 from '../Common/Title/H2';
// icons
import { RiLockFill } from 'react-icons/ri';

const PlanComponent = ({ planData }: PlanData) => {
  const router = useRouter();

  if (!planData || planData.length === 0) {
    return (
      <PlanBase>
        <NoPlanBox>
          <NoPlanImg
            src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Telegram-Animated-Emojis/main/Animals%20and%20Nature/Seedling.webp"
            alt="Seedling"
          />
          <NoPlanP>아직 등록된 학습 플랜이 없어요.</NoPlanP>
          <ApplyBtn onClick={() => router.push('/plan')}>플랜 심기</ApplyBtn>
        </NoPlanBox>
      </PlanBase>
    );
  }

  const plan = planData[0];
  const { plan_from, plan_to, day_number = 0, total_date = 0, emoji, title, level } = plan;

  // 3. 완료된 날 / 잠긴 날 배열 생성
  const daysArray = useMemo(() => {
    const completedDays = Number(day_number);
    const totalDays = Number(total_date);
    return Array.from({ length: totalDays }, (_, i) => i < completedDays);
  }, [day_number, total_date]);

  const handleDay = (idx: number) => {
    router.push({
      pathname: 'day',
      query: {
        day: idx,
        day_size: total_date,
        level: level,
      },
    });
  };

  return (
    <PlanBase>
      <PlanBox>
        <PlanHead>
          <H2>
            {emoji} {title}
          </H2>
          <PeriodP>
            {`${dayjs(plan_from).format('MM.DD')} - ${dayjs(plan_to).format('MM.DD')}`}
          </PeriodP>
        </PlanHead>
        <PlanMenu>
          {daysArray.map((isCompleted, idx) => (
            <>
              <MenuItem
                key={idx}
                locked={!isCompleted}
                onClick={() => {
                  if (!isCompleted) return;

                  handleDay(idx + 1);
                  return;
                }}
              >
                <ItemContent>
                  <MenuIcon locked={!isCompleted} />
                </ItemContent>
                <Day locked={!isCompleted}>DAY {idx + 1}</Day>
              </MenuItem>
            </>
          ))}
        </PlanMenu>
      </PlanBox>
    </PlanBase>
  );
};

export default PlanComponent;

const PlanBase = styled.section`
  background-color: ${props => props.theme.primary_08};
  height: 100%;
  overflow-y: scroll;
  border-radius: 8px;
  padding: 16px 16px 24px;
`;

const NoPlanBox = styled.div`
  height: 100%;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 16px;
`;

const NoPlanImg = styled.img`
  width: 30px;
  height: 30px;
`;

const NoPlanP = styled.p`
  text-align: center;
  word-break: keep-all;
  overflow-wrap: break-word;
`;

const PlanBox = styled.div`
  background-color: ${props => props.theme.primary_09};
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
  padding: 24px 16px;
  border-radius: 12px;
`;

const PlanHead = styled.div`
  font-size: 13px;
  display: flex;
  align-items: flex-end;
  margin-bottom: 24px;
`;

const PeriodP = styled.p`
  margin: 0 4px;
  color: ${props => props.theme.primary_05};
  font-weight: 300;
`;

const PlanMenu = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  justify-content: center;
`;

interface MenuItemProps {
  locked: boolean;
}

const MenuItem = styled.li<MenuItemProps>`
  cursor: ${props => (props.locked ? 'default' : 'pointer')};
`;

const ItemContent = styled.div`
  background-color: ${props => props.theme.primary_08};
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
  border-radius: 50%;
  color: ${props => props.theme.primary_06};
`;

const MenuIcon = ({ locked }: { locked: boolean }) => {
  return locked ? <RiLockFill /> : <ItemImg src="/gif/happy.gif" alt="emoji" />;
};

const ItemImg = styled.img`
  width: 100%;
  height: 100%;
`;

const Day = styled.span<{ locked: boolean }>`
  display: flex;
  justify-content: center;
  font-weight: 700;
  font-size: 16px;
  color: ${props => (props.locked ? '#ADB5BD' : '#212529')};
`;
