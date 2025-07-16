import { ProjectRepo } from '../repositories/projects';
import { Project } from '../models/projects';

export const ProjectService = {
  getAll(): Promise<Project[]> {
    return ProjectRepo.getAll();
  },
  create(projectData: Partial<Project>): Promise<Project> {
    return ProjectRepo.create(projectData);
  },
  update(id: string, projectData: Partial<Project>): Promise<Project | undefined> {
    return ProjectRepo.update(id, projectData);
  },
  delete(id: string): Promise<number> {
    return ProjectRepo.delete(id);
  },
};