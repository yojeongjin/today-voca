import { useRouter } from 'next/router';
import styled from 'styled-components';
import dayjs from 'dayjs';
// hook
import { useBottom } from '@/hooks/useBottom';
// utils
import handleFinish from '@/utils/finishPlan';
// ifs
import { PlanData } from '@/Interface/IPlan';
// components
import StepTitle from '../Common/Title/StepTitle';
import H4 from '../Common/Title/H4';
import ApplyBtn from '../Common/Button/ApplyButton';
import BottomSheet from '../Common/BottomSheet/BottomSheet';
import Neutral from '../Common/Lottie/Neutral';
import CloseButton from '../Common/Button/CloseButton';

const MypageComponent = ({ planData }: PlanData) => {
  const router = useRouter();
  const { openBottom, setOpenBottom } = useBottom();

  if (!planData || planData.length === 0) {
    return (
      <MyBase>
        <StepTitle
          onBack={() => {
            router.push('/');
          }}
        >
          내 플랜 관리
        </StepTitle>
        <NoPlanBox>
          <NoPlanImg>
            <Neutral />
          </NoPlanImg>
          <NoPlanP>
            아직 학습 플랜이 없어요.
            <br></br>
            아래 버튼을 눌러 학습 플랜을 심어주세요!
          </NoPlanP>

          <ApplyBtn onClick={() => router.push('/plan')}>플랜 심기</ApplyBtn>
        </NoPlanBox>
      </MyBase>
    );
  }

  return (
    <MyBase>
      <StepTitle
        onBack={() => {
          router.push('/');
        }}
      >
        내 플랜 관리
      </StepTitle>
      {planData.map(
        data =>
          data.state === 'PROGRESS' && (
            <>
              <PlanInner>
                {/* 진행중 */}
                <H4>진행 중 플랜</H4>
                <Progress>
                  <ProgressBox>
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
                            {dayjs(data.plan_to)
                              .startOf('day')
                              .diff(dayjs(data.plan_from).startOf('day'), 'day')}
                            일 남음
                          </RemainPeriod>
                        </PeriodItem>
                        <RemainPeriod></RemainPeriod>
                      </PeriodMenu>
                    </ProgressInfo>
                  </ProgressBox>
                  <ApplyBtn
                    color="#848e98"
                    onClick={() => {
                      setOpenBottom(true);
                    }}
                  >
                    플랜 종료
                  </ApplyBtn>
                </Progress>
              </PlanInner>
              {openBottom && (
                <BottomSheet
                  height={480}
                  isOpen={openBottom}
                  onClose={() => {
                    setOpenBottom(false);
                  }}
                >
                  <BottomBase>
                    <CloseButton
                      onClick={() => {
                        setOpenBottom(false);
                      }}
                    />
                    <CompleteH2>
                      {data.emoji} {data.title}
                    </CompleteH2>
                    <CompleteBody>
                      <CompleteH4>
                        완료일까지 아직
                        <BottomStrong>
                          {dayjs(data.plan_to)
                            .startOf('day')
                            .diff(dayjs(data.plan_from).startOf('day'), 'day')}
                          일
                        </BottomStrong>
                        남았어요
                      </CompleteH4>
                      <CompleteP>지금 종료할까요?</CompleteP>
                      <CompleteImg>
                        <Neutral />
                      </CompleteImg>
                    </CompleteBody>
                    <ApplyBtn
                      onClick={async () => {
                        const res = await handleFinish(data?.id!);
                        if (res === 200) {
                          setOpenBottom(false);
                          router.reload();
                        }
                      }}
                    >
                      플랜 종료
                    </ApplyBtn>
                  </BottomBase>
                </BottomSheet>
              )}
            </>
          ),
      )}
      <PlanInner>
        <H4>지난 플랜</H4>
        <PrevMenu>
          {planData.map(
            data =>
              data.state === 'FINISHED' && (
                <PrevItem>
                  <PrevEmoji>{data.emoji}</PrevEmoji>
                  <ProgressTitle>{data.title}</ProgressTitle>
                  <PeriodMenu>
                    <PeriodItem>
                      <Period>{data.level}</Period>
                    </PeriodItem>
                    <PeriodItem>
                      <Period>
                        {`${dayjs(data.plan_from).format('M.D')} ~ ${dayjs(data.plan_to).format('M.D')}`}
                      </Period>
                    </PeriodItem>
                  </PeriodMenu>
                </PrevItem>
              ),
          )}
        </PrevMenu>
      </PlanInner>
    </MyBase>
  );
};

export default MypageComponent;

const MyBase = styled.main`
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: 100%;
`;

const NoPlanBox = styled.div`
  background-color: ${props => props.theme.primary_09};
  width: 100%;
  height: 100%;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 16px;
  border-radius: 12px;
`;

const NoPlanImg = styled.div`
  width: 64px;
  height: 64px;
`;

const NoPlanP = styled.p`
  text-align: center;
  word-break: keep-all;
  overflow-wrap: break-word;
  color: ${props => props.theme.primary_04};
`;

const PlanInner = styled.div`
  padding: 0 24px;
`;

const Progress = styled.div`
  background-color: ${props => props.theme.primary_08};
  position: relative;
  padding: 16px;
  margin: 16px 0 16px;
  border-radius: 8px;
`;

const ProgressBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const EmojiBox = styled.span`
  display: block;
  margin-right: 16px;
  font-size: 24px;
`;

const ProgressInfo = styled.div``;

const ProgressTitle = styled.p`
  font-weight: 500;
  // word-break: keep-all;
  // overflow-wrap: break-word;
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
  margin-top: 24px;
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

// bottom
const BottomBase = styled.div`
  position: relative;
  padding: 24px 16px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const CompleteH2 = styled.h2`
  font-size: 16px;
`;

const CompleteBody = styled.div`
  position: relative;
`;

const CompleteH4 = styled.h4`
  font-size: 20px;
  font-weight: 300;
`;

const BottomStrong = styled.strong`
  font-weight: 500;
  margin: 0 4px;
`;

const CompleteP = styled.p`
  color: ${props => props.theme.primary_05};
  font-size: 14px;
  margin-top: 8px;
`;

const CompleteImg = styled.div`
  width: 68px;
  height: 68px;
  margin: 0 auto;
`;
