export interface LoginProps {
  email: string;
  password: string;
  name?: string;
}
export interface AddUSerProps {
  userId: any;
  name?: string;
  email: string;
}
export interface Habit {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  color: string;
  created_at: string;
  updated_at: string;
}

export interface HabitLog {
  id: string;
  habit_id: string;
  user_id: string;
  date: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
}
