import db from '../config/db';
import { Project } from '../models/projects';

const TABLE_NAME = 'projects';

export const ProjectRepo = {
  async getAll(): Promise<Project[]> {
    return db(TABLE_NAME).select().orderBy('created_at', 'desc');
  },
  async create(projectData: Partial<Project>): Promise<Project> {
    const [project] = await db(TABLE_NAME).insert(projectData).returning('*');
    return project;
  },
  async update(id: string, projectData: Partial<Project>): Promise<Project | undefined> {
    const [project] = await db(TABLE_NAME).where({ id }).update(projectData).returning('*');
    return project;
  },
  async delete(id: string): Promise<number> {
    return db(TABLE_NAME).where({ id }).del();
  },
};  