import { useRouter } from 'next/router';
import styled from 'styled-components';
// progress
import { Line } from 'rc-progress';
// components
import ApplyBtn from '../Common/Button/ApplyButton';
import H4 from '../Common/Title/H4';

const PlanComponent = () => {
  const router = useRouter();
  return (
    <PlanBase>
      {/* <NoPlanBox>
        <NoPlanI>📝</NoPlanI>
        <NoPlanP>아직 등록된 학습 플랜이 없어요.</NoPlanP>
        <ApplyBtn
          onClick={() => {
            router.push('/plan');
          }}
        >
          플랜 등록하기
        </ApplyBtn>
      </NoPlanBox> */}
      <PlanBox>
        <PlanHead>
          <H4>🏄🏻‍♀️ 냥냥이</H4>
        </PlanHead>

        <PlanMenu>
          <PlanItem>
            <PlanSubject>Day 1</PlanSubject>
            <PlanProgress>
              <ProgressSpan>52.3%</ProgressSpan>
              <Line
                percent={10}
                strokeWidth={4}
                trailWidth={4}
                strokeColor="#1871ff"
                trailColor="#eee"
              />
            </PlanProgress>
          </PlanItem>

          <PlanItem>
            <PlanSubject>Day 1</PlanSubject>
            <PlanProgress>
              <ProgressSpan>52.3%</ProgressSpan>
              <Line
                percent={10}
                strokeWidth={4}
                trailWidth={4}
                strokeColor="#1871ff"
                trailColor="#eee"
              />
            </PlanProgress>
          </PlanItem>

          <PlanItem>
            <PlanSubject>Day 1</PlanSubject>
            <PlanProgress>
              <ProgressSpan>52.3%</ProgressSpan>
              <Line
                percent={10}
                strokeWidth={4}
                trailWidth={4}
                strokeColor="#1871ff"
                trailColor="#eee"
              />
            </PlanProgress>
          </PlanItem>
        </PlanMenu>
      </PlanBox>
    </PlanBase>
  );
};

export default PlanComponent;

const PlanBase = styled.section`
  background-color: ${props => props.theme.primary_09};
  height: calc(100% - 80px);
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.01);
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

const NoPlanI = styled.i`
  font-family: 'Tossface', sans-serif;
  font-size: 36px;
`;

const NoPlanP = styled.p`
  text-align: center;
  word-break: keep-all;
  overflow-wrap: break-word;
`;

const PlanBox = styled.div``;

const PlanHead = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
`;

const PlanMenu = styled.ul``;

const PlanItem = styled.li`
  // background-color: ${props => props.theme.primary_08};
  background-color: #fbfbfb;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  margin: 12px 0;
  border-radius: 12px;
`;

const PlanIcon = styled.i`
  font-family: 'Tossface', sans-serif;
  font-size: 15px;
  margin-right: 16px;
`;

const PlanSubject = styled.p`
  dispaly: flex;
  align-items: center;
`;

const PlanProgress = styled.div`
  width: 35%;
  transform: scaleX(-1); // 👈 진행 방향 반전
  direction: rtl;
`;

const ProgressSpan = styled.span`
  display: inline-block;
  width: 100%;
  text-align: right;
  transform: scaleX(-1);
  font-size: 11px;
  font-weight: 300;
`;
