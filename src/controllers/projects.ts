import { Request, Response } from 'express';
import { ProjectService } from '../services/projects';

export const ProjectController = {
  async getAll(req: Request, res: Response) {
    const projects = await ProjectService.getAll();
    res.json(projects);
  },
  async create(req: Request, res: Response) {
    const project = await ProjectService.create(req.body);
    res.status(201).json(project);
  },
  async update(req: Request, res: Response) {
    const project = await ProjectService.update(req.params.id, req.body);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  },
  async delete(req: Request, res: Response) {
    const count = await ProjectService.delete(req.params.id);
    if (count === 0) return res.status(404).json({ message: 'Project not found' });
    res.status(204).send();
  }
};