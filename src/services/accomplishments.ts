import db from '../config/db';
import { Knex } from 'knex';
import { AccomplishmentRepo } from '../repositories/accomplishments';
import { Accomplishment, AccomplishmentWithProject, AccomplishmentsWithProofs, ProofInput } from '../models/accomplishments';

export const AccomplishmentService = {
  async getAccomplishmentById(id: string): Promise<AccomplishmentsWithProofs | undefined> {
    const result = await AccomplishmentRepo.getWithProofsById(id);
    return result ? { ...result.accomplishment, proofs: result.proofs } : undefined;
  },

  listAccomplishmentsForTask(taskId: string): Promise<Accomplishment[]> {
    return AccomplishmentRepo.listByTaskId(taskId);
  },

  async createAccomplishment(
    data: Omit<Accomplishment, 'id' | 'createdAt' | 'updatedAt'>,
    proofs: ProofInput[] = []
  ): Promise<Accomplishment> {
    return db.transaction(async (trx: Knex.Transaction) => {
      const accomplishment = await AccomplishmentRepo.create(trx, data);

      if (proofs.length > 0) {
        await AccomplishmentRepo.insertProofs(trx, accomplishment.id, proofs);
      }

      return accomplishment;
    });
  },

  async updateAccomplishment(id: string, updates: Partial<Accomplishment>): Promise<Accomplishment | undefined> {
    return AccomplishmentRepo.update(id, updates);
  },

  async deleteAccomplishment(id: string): Promise<number> {
    return AccomplishmentRepo.deleteAccomplishment(id);
  },

  async getAccomplishmentsByDateRange(startDate: string, endDate: string): Promise<AccomplishmentWithProject[]> {
    return AccomplishmentRepo.getAccomplishmentsByDateRange(startDate, endDate);
  },

  async deleteAccomplishmentsByTaskId(taskId: string): Promise<number> {
    return AccomplishmentRepo.deleteAccomplishmentsByTaskId(taskId);
  }
};
