import { Day } from '@/type/day';
import { NextStepProps } from './Istep';

export interface DayProps extends NextStepProps {
  dayData: Day[];
  plan_id?: number;
  day_number?: number;
}
