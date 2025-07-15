import { TaskRepo } from '../repositories/tasks';
import { Task } from '../models/tasks';

export const TaskService = {
  getAll(): Promise<Task[]> {
    return TaskRepo.getAll();
  },

  getById(id: string): Promise<Task | undefined> {
    return TaskRepo.getById(id);
  },

  getTasksByDate(date: string): Promise<Task[]> {
    return TaskRepo.getTasksByDate(date);
  },

  create(data: Partial<Task>): Promise<Task> {
    return TaskRepo.create(data);
  },

  update(id: string, data: Partial<Task>): Promise<Task | undefined> {
    return TaskRepo.update(id, data);
  },

  delete(id: string): Promise<number> {
    return TaskRepo.delete(id);
  }
};
