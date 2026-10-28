export type Course = {
  id: string; title: string; category: string; description: string; lessons: number;
  duration: string; level: string; color: string; emoji: string; instructor: string;
};
export type Preferences = { dailyGoal: number; reminders: boolean; displayName: string; reminderHour: number };
