import db from '../config/db';
import { Knex } from 'knex';
import { AccomplishmentRepo } from '../repositories/accomplishments';
import { Accomplishment, AccomplishmentsWithProofs, ProofInput } from '../models/accomplishments';

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

  updateAccomplishment(id: string, updates: Partial<Accomplishment>): Promise<Accomplishment | undefined> {
    return AccomplishmentRepo.update(id, updates);
  },

  deleteAccomplishment(id: string): Promise<number> {
    return AccomplishmentRepo.deleteAccomplishment(id);
  }
};
