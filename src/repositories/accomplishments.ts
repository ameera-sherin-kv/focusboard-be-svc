import db from '../config/db';
import { Knex } from 'knex';
import { Accomplishment, ProofInput } from '../models/accomplishments';

const ACCOMPLISHMENT_TABLE = 'accomplishments';
const PROOF_TABLE = 'accomplishment_proofs';

export const AccomplishmentRepo = {
  async getById(id: string): Promise<Accomplishment | undefined> {
    return db<Accomplishment>(ACCOMPLISHMENT_TABLE).where({ id }).first();
  },

  async getWithProofsById(id: string): Promise<{ accomplishment: Accomplishment; proofs: any[] } | undefined> {
    const accomplishment = await db<Accomplishment>(ACCOMPLISHMENT_TABLE).where({ id }).first();
    if (!accomplishment) return undefined;

    const proofs = await db(PROOF_TABLE).where({ accomplishment_id: id });
    return { accomplishment, proofs };
  },

  async listByTaskId(taskId: string): Promise<Accomplishment[]> {
    return db<Accomplishment>(ACCOMPLISHMENT_TABLE).where({ task_id: taskId });
  },

  async create(
    trx: Knex.Transaction,
    data: Omit<Accomplishment, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<Accomplishment> {
    const [created] = await trx(ACCOMPLISHMENT_TABLE).insert(data).returning('*');
    return created;
  },

  async insertProofs(trx: Knex.Transaction, accomplishmentId: string, proofs: ProofInput[]): Promise<void> {
    const rows = proofs.map((p) => ({ ...p, accomplishment_id: accomplishmentId }));
    await trx(PROOF_TABLE).insert(rows);
  },

  async update(id: string, updates: Partial<Accomplishment>): Promise<Accomplishment | undefined> {
    const [updated] = await db(ACCOMPLISHMENT_TABLE).where({ id }).update(updates).returning('*');
    return updated;
  },

  async deleteAccomplishment(id: string): Promise<number> {
    return db.transaction(async (trx: Knex.Transaction) => {
      await trx(PROOF_TABLE).where({ accomplishment_id: id }).del();
      return trx(ACCOMPLISHMENT_TABLE).where({ id }).del();
    });
  }
};
