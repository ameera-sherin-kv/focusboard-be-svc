import { Router } from "express";
import { ProjectController } from "../controllers/projects";

const router = Router();

router.get('/', ProjectController.getAll);
router.post('/', ProjectController.create);
router.put('/:id', ProjectController.update);
router.delete('/:id', ProjectController.delete);

export default router;