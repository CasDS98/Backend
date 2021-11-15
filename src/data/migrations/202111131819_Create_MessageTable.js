const { tables } = require('..');

module.exports = {
	up: async (knex) => {
    await knex.schema.createTable(tables.message, (table) => {
      table.timestamp('dateTime').defaultTo(knex.fn.now()).primary()
      table.string('user', 255).notNullable().unique();
      table.uuid('groupID').notNullable().unique();
      table.string('value', 300);
      table.foreign('user').references('users.email');
      table.foreign('groupID').references('Group.id');
		});
	},
	down: (knex) => {
    return knex.schema.dropTableIfExists(tables.message);
	},
};