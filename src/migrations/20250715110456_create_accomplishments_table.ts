import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('accomplishments', (table) => {
      table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
      table.uuid('task_id').references('id').inTable('tasks').onDelete('CASCADE');
      
      table.string('title').notNullable();
      table.text('description');
      table.integer('time_taken').notNullable();
      table.text('challenges');
      table.text('comments');
  
      table.timestamps(true, true);
    });
  }
  
  export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('accomplishments');
  }

