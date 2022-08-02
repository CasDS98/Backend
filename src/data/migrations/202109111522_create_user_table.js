const { tables } = require('..');

module.exports = {
	up: async (knex) => {
		await knex.schema.createTable(tables.user, (table) => {
			table.uuid('id').primary();

			table.string('email', 255).unique();
			

			table.string('user_name', 255)
				.notNullable();

			table.jsonb('roles')
				.notNullable();

				table.string('password')
				.notNullable();
		});
	},
	down: (knex) => {
		return knex.schema.dropTableIfExists(tables.user);
	},
};