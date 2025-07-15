export enum TaskStatus {
    PLANNED = 'planned',
    IN_PROGRESS = 'in_progress',
    COMPLETED = 'completed',
    CANCELLED = 'cancelled'
  }
  
export enum TaskPriority {
    HIGH = 'high',
    MEDIUM = 'medium',
    LOW = 'low'
  }

export interface Task {
    id: string;
    title: string;
    priority: TaskPriority;
    status: TaskStatus;
    estimated_time: number;
    notes?: string;
    date: string; // ISO string or YYYY-MM-DD
    created_at: string;
    updated_at: string;
    completed_at?: string | null;
  }
  