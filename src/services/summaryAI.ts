import axios from 'axios';
import z from 'zod';
import zodToJsonSchema from 'zod-to-json-schema';
import { AccomplishmentService } from './accomplishments';

const ProjectSummaryItem = z.object({
  deliveryDetails: z.string(),
  accomplishments: z.string(),
  approach: z.string(),
});

const ProjectSummaryArray = z.array(ProjectSummaryItem);

const SummaryItem = z.object({
  projectName: z.string(),
  projectSummary: ProjectSummaryArray,
});

const SummaryArray = z.array(SummaryItem);

export const SummaryAIService = {
  async generateHighlightsFromAccomplishments(startDate: string, endDate: string) {
    const accomplishments = await AccomplishmentService.getAccomplishmentsByDateRange(startDate, endDate);

    if (!accomplishments || accomplishments.length === 0) {
      return [];
    }
    
    const grouped = accomplishments.reduce((acc, a) => {
      const key = a.project_id!;
      if (!acc[key]) {
        acc[key] = {
          project_name: a.project_name ?? '',
          project_description: a.project_description ?? '',
          tasks: []
        };
      }
      acc[key].tasks.push({
        title: a.title ?? '',
        challenges: a.challenges ?? '',
        comments: a.comments ?? ''
      });
      return acc;
    }, {} as Record<string, {
      project_name: string;
      project_description: string;
      tasks: { title: string; challenges: string; comments: string }[];
    }>);

    const listOfAccomplishments = Object.values(grouped).map(project =>
      `Project Name: ${project.project_name}
    Project Description: ${project.project_description}
    ${project.tasks.map(task =>
      `  - Task: ${task.title}
        Challenges: ${task.challenges}
        Comments: ${task.comments}`).join('\n')}`
    ).join('\n\n');

    const prompt = `You are given a list of accomplishments grouped by project. Each project includes:
    - Project name
    - Project description (for context only)
    - A list of tasks with associated challenges and comments
    
    Your job is to summarize these accomplishments into structured JSON for each project. For each project, return an object with:
    
    - "projectName": The name of the project
    - "projectSummary": an array with a single object containing:
      - "deliveryDetails": bullet points summarizing the key tasks or features completed (inferred from task titles or descriptions)
      - "accomplishments": bullet points summarizing what was achieved through those tasks
      - "approach": bullet points describing how the tasks were approached (tools, techniques, reasoning, etc.)
    
    ⚠️ DO NOT repeat or include the project description in the output — use it only to help understand the tasks better.
    
    ⚠️ ONLY return the result as valid JSON. Do NOT include explanations, markdown, or code samples.
    
    Here is the data:
    ${listOfAccomplishments}
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
