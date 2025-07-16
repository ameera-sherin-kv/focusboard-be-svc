import { DashboardRepo } from '../repositories/dashboard';
import { DashboardStats } from '../models/dashboard';

export const DashboardService = {
  getStatsByDate(date: string): Promise<DashboardStats> {
    return DashboardRepo.getStatsByDate(date);
  }
};
