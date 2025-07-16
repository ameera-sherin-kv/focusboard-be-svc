import { Router } from 'express';
import { DashboardController } from '../controllers/dashboard';

const router = Router();

router.get('/stats', DashboardController.getStatsByDate);

export default router;
