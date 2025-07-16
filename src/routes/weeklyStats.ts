import { Router } from 'express';
import { weeklyStatsHandler } from '../controllers/weeklyStats';

const router = Router();

router.get('/weekly-stats', weeklyStatsHandler);

export default router;
