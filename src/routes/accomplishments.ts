import express from 'express';
import { AccomplishmentController } from '../controllers/accomplishments';

const router = express.Router();

router.post('/', AccomplishmentController.create);
router.get('/date-range', AccomplishmentController.getAccomplishmentsByDateRange);
router.get('/:id', AccomplishmentController.getOne);
router.delete('/:id', AccomplishmentController.delete);
router.put('/:id', AccomplishmentController.update);
router.get('/task/:taskId', AccomplishmentController.listByTask);
router.delete('/task/:taskId', AccomplishmentController.deleteAccomplishmentsByTaskId);

export default router;
