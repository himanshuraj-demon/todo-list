export type Priority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  text: string;
  completed: boolean;
  priority: Priority;
  category: string;
  createdAt: number;
}

export type FilterType = 'all' | 'active' | 'completed';

export const CATEGORIES = ['Personal', 'Work', 'Shopping', 'Health', 'Finance'] as const;
