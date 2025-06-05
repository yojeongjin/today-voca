import { useMemo } from 'react';
import { useRouter } from 'next/router';
import styled, { keyframes, css } from 'styled-components';
import dayjs from 'dayjs';
// ifs
import { PlanData } from '@/Interface/IPlan';
import { DailyItem } from '@/type/planInfo';
// components
import ApplyBtn from '../Common/Button/ApplyButton';
import Happy from '../Common/Lottie/Happy';
import Neutral from '../Common/Lottie/Neutral';
import Delighted from '../Common/Lottie/Delighted';

// icons
import { RiLockFill } from 'react-icons/ri';

const PlanComponent = ({ planData }: PlanData) => {
  const router = useRouter();

  if (!planData || planData.length === 0) {
    return (
      <PlanBase>
        <NoPlanInner>
          <NoPlanBox>
            <NoPlanImg src="/gif/neutral.gif" alt="Seedling" />
            <NoPlanP>
              아직 학습 플랜이 없어요.
              <br></br>
              아래 버튼을 눌러 학습 플랜을 심어주세요!
            </NoPlanP>

            <ApplyBtn onClick={() => router.push('/plan')}>플랜 심기</ApplyBtn>
          </NoPlanBox>
        </NoPlanInner>
      </PlanBase>
    );
  }

  const plan = planData[0];
  const { plan_from, plan_to, emoji, title, total_date, daily_list = [], level } = plan;

  const daysArray: DailyItem[] = useMemo(() => {
    let lastOpenIdx = -1;

    const array = Array.from({ length: total_date }, (_, i) => {
      const dayNum = i + 1;
      const matched = daily_list.find(d => d.day_number === dayNum);

      if (!matched) {
        const locked = dayNum !== 1;
        if (!locked) lastOpenIdx = i;
        return {
          day: dayNum,
          locked,
        };
      }

      lastOpenIdx = i;
      return {
        ...matched,
        day: dayNum,
        dailyState: matched.daily_state,
        currentStep: matched.current_step,
        locked: false,
      };
    });

    // 마지막 열린 Day에 isToday: true 추가
    if (lastOpenIdx !== -1) {
      array[lastOpenIdx] = {
        ...array[lastOpenIdx],
        isToday: true,
      };
    }

    return array;
  }, [daily_list, total_date]);

  // 아이콘 출력 부분
  const MenuIcon = ({
    locked,
    dailyState,
    currentStep,
  }: {
    locked: boolean;
    dailyState?: string;
    currentStep?: number;
  }) => {
    if (locked) return <RiLockFill />;

    let LottieComponent = Happy;

    if (dailyState === 'done') {
      if (currentStep === 1 || currentStep === 2) {
        LottieComponent = Neutral;
      } else if (currentStep === 3) {
        LottieComponent = Delighted;
      }
    }

    return (
      <LottieBox>
        <LottieComponent />
      </LottieBox>
    );
  };

  return (
    <PlanBase>
      <PlanBox>
        <PlanTitle>
          <PlanH2>
            {emoji} {title}
          </PlanH2>
          <PeriodP>
            {`${dayjs(plan_from).format('M.D')} - ${dayjs(plan_to).format('M.D')}`} (총
            <PeriodStrong> {total_date}</PeriodStrong> 일)
          </PeriodP>
        </PlanTitle>
        <PlanMenu>
          {daysArray.map((item, idx) => (
            <MenuItem
              key={idx}
              locked={item.locked}
              onClick={() => {
                if (item.locked) return;

                router.push({
                  pathname: 'day',
                  query: {
                    day: item.day,
                    day_size: total_date,
                    level,
                  },
                });
              }}
            >
              <ItemContent isToday={(item as any).isToday}>
                <MenuIcon
                  locked={item.locked}
                  dailyState={item.daily_state}
                  currentStep={item.current_step}
                />
              </ItemContent>
              <Day locked={item.locked} isToday={(item as any).isToday}>
                DAY {item.day}
              </Day>
            </MenuItem>
          ))}
        </PlanMenu>
      </PlanBox>
    </PlanBase>
  );
};

export default PlanComponent;

const PlanBase = styled.section`
  background-color: ${props => props.theme.primary_08};
  height: calc(100% - 67px);
  overflow-y: scroll;
`;

const NoPlanInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 32px 24px 24px;
`;

const NoPlanBox = styled.div`
  background-color: ${props => props.theme.primary_09};
  width: 100%;
  height: 90%;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 16px;
  border-radius: 12px;
`;

const NoPlanImg = styled.img`
  width: 64px;
  height: 64px;
`;

const NoPlanP = styled.p`
  text-align: center;
  word-break: keep-all;
  overflow-wrap: break-word;
  color: ${props => props.theme.primary_04};
`;

// plan
const PlanBox = styled.div`
  background-color: ${props => props.theme.primary_09};
  min-height: 100%;
  padding: 24px 16px;
  border-radius: 24px 24px 0 0;
`;

const PlanTitle = styled.div`
  display: flex;
  align-items: flex-end;
  padding: 0 0 24px;
`;

const PlanH2 = styled.h2`
  font-size: 20px;
  font-weight: 500;
  letter-spacing: -0.5px;
`;

const PeriodP = styled.p`
  margin-left: 8px;
  font-size: 13px;
  font-weight: 300;
  color: ${props => props.theme.primary_04};
`;

const PeriodStrong = styled.strong`
  font-weight: 400;
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

// 반짝반짝
const pulsate = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(2, 127, 255, 0.7);
  }
  50% {
    box-shadow: 0 0 0 6px rgba(136, 192, 87, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(136, 192, 87, 0);
  }
`;

const ItemContent = styled.div<{ isToday: boolean }>`
  background-color: ${props => props.theme.primary_08};
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
  border-radius: 50%;
  color: ${props => props.theme.primary_06};

  ${props =>
    props.isToday &&
    css`
      border: 2px solid #cde6ff;
      animation: ${pulsate} 1.4s infinite;
    `}
`;

const LottieBox = styled.div`
  border-radius: 50%;
  padding-top: 4px;
`;

const Day = styled.span<{ locked: boolean; isToday: boolean }>`
  display: flex;
  justify-content: center;
  font-weight: 700;
  font-size: 16px;
  color: ${props => (props.locked ? '#ADB5BD' : props.isToday ? '#212529' : '#cde6ff')};
`;
