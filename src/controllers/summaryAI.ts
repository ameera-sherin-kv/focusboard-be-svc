import { Request, Response } from 'express';
import { SummaryAIService } from '../services/summaryAI';

export const SummaryAIController = {
  async generateHighlightsFromAccomplishments(req: Request, res: Response) {
    const { startDate, endDate } = req.query;
  
    if (!startDate || !endDate) {
      return res.status(400).json({ message: 'Missing startDate or endDate' });
    }
    try {
      const highlights = await SummaryAIService.generateHighlightsFromAccomplishments(String(startDate), String(endDate));
      res.json(highlights);
    } catch (error) {
      console.error('Error generating highlights from accomplishments:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
};