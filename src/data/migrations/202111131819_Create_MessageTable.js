const { tables } = require('..');

module.exports = {
	up: async (knex) => {
    await knex.schema.createTable(tables.message, (table) => {
      table.uuid('id').primary();
      table.timestamp('date_time').defaultTo(knex.fn.now());
      table.uuid('user').notNullable();
      table.uuid('group').notNullable();
      table.string('value', 300);
      table.foreign('user').references('user.id');
      table.foreign('group').references('group.id');
		});
	}, 
	down: (knex) => {
    return knex.schema.dropTableIfExists(tables.message);
	},
};