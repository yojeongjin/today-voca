export type PlanInfo = {
  id: number;
  plan_id: number;
  title: string;
  plan_from: Date | null;
  plan_to: Date | null;
  total_date: number;
  course?: string;
  level: string;
  state: string;
  emoji: string;
  daily_list: DailyItem[];
};

export interface DailyItem {
  day: number;
  locked: boolean;
  day_number?: number;
  daily_state?: string;
  current_step?: number;
  isToday?: boolean;
}
