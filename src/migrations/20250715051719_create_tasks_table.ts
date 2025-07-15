import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('tasks', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.text('title').notNullable();

    table
      .enu('priority', ['high', 'medium', 'low'], {
        useNative: true,
        enumName: 'task_priority',
      })
      .notNullable()
      .defaultTo('medium');

    table
      .enu('status', ['planned', 'in_progress', 'completed', 'discarded'], {
        useNative: true,
        enumName: 'task_status',
      })
      .notNullable()
      .defaultTo('planned');

    table.integer('estimated_time').notNullable();
    table.text('notes');
    table.date('date').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.timestamp('completed_at');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('tasks');
  await knex.raw('DROP TYPE IF EXISTS task_priority');
  await knex.raw('DROP TYPE IF EXISTS task_status');
}
