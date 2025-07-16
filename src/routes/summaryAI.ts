import { Router } from 'express';
import { SummaryAIController } from '../controllers/summaryAI';

const router = Router();

router.post('/', SummaryAIController.generateHighlightsFromAccomplishments);

export default router;  