const { tables } = require('..');

module.exports = {
	up: async (knex) => {
		await knex.schema.createTable(tables.group, (table) => {
      table.uuid('id').primary();
			table.string('name', 40).notNullable();
    });
	},
	down: (knex) => {
    return knex.schema.dropTableIfExists(tables.group)
	},
};