import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('accomplishment_proofs', (table) => {
      table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
      table.uuid('accomplishment_id')
        .references('id')
        .inTable('accomplishments')
        .onDelete('CASCADE');
  
      table.enum('type', ['pull_request', 'screenshot', 'document']).notNullable();
      table.string('title').notNullable();
      table.string('url');
  
      table.timestamps(true, true);
    });
  }
  
  export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('accomplishment_proofs');
  }
