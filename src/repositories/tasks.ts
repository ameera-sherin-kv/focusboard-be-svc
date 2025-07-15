import db from '../config/db';
import { Task } from '../models/tasks';

const TABLE_NAME = 'tasks';

export const TaskRepo = {
  async getAll(): Promise<Task[]> {
    return db(TABLE_NAME).select().orderBy('created_at', 'desc');
  },

  async getTasksByDate(date: string): Promise<Task[]> {
    return db(TABLE_NAME).where('date', date).orderBy('created_at', 'desc');
  },

  async getById(id: string): Promise<Task | undefined> {
    return db(TABLE_NAME).where({ id }).first();
  },

  async create(taskData: Partial<Task>): Promise<Task> {
    const [task] = await db(TABLE_NAME).insert(taskData).returning('*');
    return task;
  },

  async update(id: string, updates: Partial<Task>): Promise<Task | undefined> {
    const [updated] = await db(TABLE_NAME).where({ id }).update(updates).returning('*');
    return updated;
  },

  async delete(id: string): Promise<number> {
    return db(TABLE_NAME).where({ id }).del();
  }
};
