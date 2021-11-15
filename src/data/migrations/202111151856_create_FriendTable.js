const { tables } = require('..');

module.exports = {
	up: async (knex) => {
    await knex.schema.createTable(tables.friend, (table) => {
      table.string('userA', 255);
      table.string('userB', 255);
      table.primary(['userA', 'userB']);
      table.foreign('userA').references('users.email');
      table.foreign('userB').references('users.email');
		});
	}, 
	down: (knex) => {
    return knex.schema.dropTableIfExists(tables.friend);
	},
};