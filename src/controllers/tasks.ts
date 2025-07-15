import { Request, Response } from 'express';
import { TaskService } from '../services/tasks';

export const TaskController = {
  async getAll(req: Request, res: Response) {
    const tasks = await TaskService.getAll();
    res.json(tasks);
  },

  async getById(req: Request, res: Response) {
    const task = await TaskService.getById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  },

  async getTasksByDate(req: Request, res: Response) {
    const tasks = await TaskService.getTasksByDate(req.params.date);
    res.json(tasks);
  },

  async create(req: Request, res: Response) {
    const task = await TaskService.create(req.body);
    res.status(201).json(task);
  },

  async update(req: Request, res: Response) {
    const task = await TaskService.update(req.params.id, req.body);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  },

  async delete(req: Request, res: Response) {
    const count = await TaskService.delete(req.params.id);
    if (count === 0) return res.status(404).json({ message: 'Task not found' });
    res.status(204).send();
  }
};
