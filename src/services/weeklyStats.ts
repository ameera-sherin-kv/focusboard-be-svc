import { TaskRepo } from '../repositories/tasks';
import { getWeekdayRange, formatDayLabel } from '../utils/dateUtils';

export async function getWeeklyStats(givenDate: Date) {
  const weekDates = getWeekdayRange(givenDate);

  const results = await Promise.all(
    weekDates.map(async (date) => {
      const isoDate = date.toISOString().split('T')[0]; // 'YYYY-MM-DD'

      const planned = await TaskRepo.countPlannedTasksByDate(isoDate)
      const completed = await TaskRepo.countCompletedByDate(isoDate);

      return {
        day: formatDayLabel(date),
        planned,
        completed,
      };
    })
  );

  return results;
}
