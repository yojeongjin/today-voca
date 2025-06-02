export type PlanInfo = {
  title: string;
  plan_from: Date | null;
  plan_to: Date | null;
  course: string;
  level: string;
  emoji: string;
  total_date?: number;
  day_number?: number | null;
};
