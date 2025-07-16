import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable('tasks', (table) => {
        table.uuid('project_id').references('id').inTable('projects');
      });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable('tasks', (table) => {
        table.dropColumn('project_id');
      });
}

