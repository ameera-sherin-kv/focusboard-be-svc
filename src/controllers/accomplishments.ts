import { Request, Response } from 'express';
import { AccomplishmentService } from '../services/accomplishments';

export const AccomplishmentController = {
  async create(req: Request, res: Response) {
    const { proofs = [], ...data } = req.body;
    const result = await AccomplishmentService.createAccomplishment(data, proofs);
    res.status(201).json(result);
  },

  async getOne(req: Request, res: Response) {
    const id = req.params.id;
    const result = await AccomplishmentService.getAccomplishmentById(id);
    res.json(result);
  },

  async delete(req: Request, res: Response) {
    const id = req.params.id;
    await AccomplishmentService.deleteAccomplishment(id);
    res.status(204).send();
  },

  async update(req: Request, res: Response) {
    const id = req.params.id;
    const updates = req.body;
    await AccomplishmentService.updateAccomplishment(id, updates);
    res.status(200).json({ updated: true });
  },

  async listByTask(req: Request, res: Response) {
    const taskId = req.params.taskId;
    const results = await AccomplishmentService.listAccomplishmentsForTask(taskId);
    res.json(results);
  },

  async getAccomplishmentsByDateRange(req: Request, res: Response) {
    const { startDate, endDate } = req.query;
  
    if (!startDate || !endDate) {
      return res.status(400).json({ message: 'Missing startDate or endDate' });
    }
  
    try {
      const accomplishments = await AccomplishmentService.getAccomplishmentsByDateRange(
        String(startDate),
        String(endDate)
      );
      return res.json(accomplishments);
    } catch (error) {
      console.error('Error fetching accomplishments by date range:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },
};
