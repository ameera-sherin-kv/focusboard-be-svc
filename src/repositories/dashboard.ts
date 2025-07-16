import db from '../config/db';
import { Task } from '../models/tasks';
import { DashboardStats } from '../models/dashboard';

export const DashboardRepo = {
  async getStatsByDate(date: string): Promise<DashboardStats> {
    const tasks: Task[] = await db('tasks').where('date', date).orderBy('created_at', 'desc');

    const plannedTasks = tasks.filter(t => t.status === 'planned').length;
    const inProgressTasks = tasks.filter(t => t.status === 'in_progress').length;
    const completedTasks = tasks.filter(t => t.status === 'completed').length;
    const discardedTasks = tasks.filter(t => t.status === 'discarded').length;

    const totalEstimatedMinutes = tasks.reduce((sum, t) => sum + (t.estimated_time || 0), 0);

    const taskIds = tasks.map(t => t.id);

    let totalActualMinutes = 0;

    if (taskIds.length > 0) {
      const result = await db('accomplishments')
        .whereIn('task_id', taskIds)
        .sum({ total: 'time_taken' })
        .first();

      totalActualMinutes = Number(result?.total) || 0;
    }

    const completionRate = tasks.length > 0
      ? parseFloat(((completedTasks / tasks.length) * 100).toFixed(2))
      : 0;

    return {
      plannedTasks,
      inProgressTasks,
      completedTasks,
      discardedTasks,
      totalEstimatedMinutes,
      totalActualMinutes,
      completionRate
    };
  }
};
