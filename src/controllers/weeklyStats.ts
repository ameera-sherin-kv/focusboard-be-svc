import { Request, Response } from 'express';
import { getWeeklyStats } from '../services/weeklyStats';

export async function weeklyStatsHandler(req: Request, res: Response) {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ error: 'Missing date parameter' });
    }

    const givenDate = new Date(date as string);
    if (isNaN(givenDate.getTime())) {
      return res.status(400).json({ error: 'Invalid date format' });
    }

    const stats = await getWeeklyStats(givenDate);
    return res.json(stats);
  } catch (error) {
    console.error('[weeklyStatsHandler]', error);
    return res.status(500).json({ error: 'Server error' });
  }
}
