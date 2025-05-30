import { NextStepProps } from './Istep';
import { PlanInfo } from '@/type/planInfo';

export interface PlanProps extends NextStepProps {
  planInfo: PlanInfo;
  setPlanInfo: React.Dispatch<React.SetStateAction<PlanInfo>>;
}
