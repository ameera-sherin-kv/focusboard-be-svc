import { Request, Response } from 'express';
import { DashboardStats } from '../models/dashboard';
import { DashboardService } from '../services/dashboard';

export const DashboardController = {
  async getStatsByDate(req: Request, res: Response) {
    const date = req.query.date as string;
    const stats: DashboardStats = await DashboardService.getStatsByDate(date);
    res.json(stats);
  }
};
