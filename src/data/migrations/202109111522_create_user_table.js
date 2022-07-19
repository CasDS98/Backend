const { tables } = require('..');

module.exports = {
	up: async (knex) => {
		await knex.schema.createTable(tables.user, (table) => {
			table.uuid('id').primary();

			table.string('email', 255);
			

			table.string('user_name', 255)
				.notNullable();

			table.string('password', 20).notNullable();
		});
	},
	down: (knex) => {
		return knex.schema.dropTableIfExists(tables.user);
	},
};