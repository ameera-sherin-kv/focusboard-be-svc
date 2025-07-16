import axios from 'axios';
import z from 'zod';
import zodToJsonSchema from 'zod-to-json-schema';
import { AccomplishmentService } from './accomplishments';

const SummaryItem = z.object({
  deliveryDetails: z.string(),
  accomplishments: z.string(),
  approach: z.string(),
});

const SummaryArray = z.array(SummaryItem);

export const SummaryAIService = {
  async generateHighlightsFromAccomplishments(startDate: string, endDate: string) {
    const accomplishments = await AccomplishmentService.getAccomplishmentsByDateRange(startDate, endDate);

    if (!accomplishments || accomplishments.length === 0) {
      return [];
    }

    const prompt = `You are given a list of accomplishments. For each accomplishment, return a JSON object with the following keys:

- "deliveryDetails": A short title describing what was delivered (can be inferred from the title or description)
- "accomplishments": A concise summary (1–2 lines) of what was achieved
- "approach": How it was implemented or approached — mention tools, techniques, or reasoning where applicable

Return the result as an array of such objects, like this:

[
  {
    "deliveryDetails": "Short title of task completed",
    "accomplishments": "What was achieved in this task",
    "approach": "How it was done (technique, tools, logic)"
  },
  ...
]

Here are the accomplishments:
${accomplishments.map(a => `${a.title ?? ''}\n${a.challenges ?? ''}\n${a.comments ?? ''}`).join('\n')}
`;

    const res = await axios.post('http://localhost:11434/api/generate', {
      model: 'llama3',
      prompt,
      stream: false,
      format: zodToJsonSchema(SummaryArray)
    });

    const response = JSON.parse(res.data.response);
    return response;
  }
};
