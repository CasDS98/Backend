const { tables } = require('..');

module.exports = {
	up: async (knex) => {
		await knex.schema.createTable(tables.user, (table) => {
			table.string('email', 255)
				.primary();

			table.string('userName', 255)
				.notNullable();

			table.string('password', 20).notNullable();;
		});
	},
	down: (knex) => {
		return knex.schema.dropTableIfExists(tables.user);
	},
};