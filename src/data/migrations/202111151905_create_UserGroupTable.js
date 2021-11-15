const { tables } = require('..');

module.exports = {
	up: async (knex) => {
    await knex.schema.createTable(tables.userGroup, (table) => {
      table.string('user', 255);
      table.uuid('group');
      table.primary(['user', 'group']);
      table.foreign('user').references('users.email');
      table.foreign('group').references('Group.id');
		});
	}, 
	down: (knex) => {
    return knex.schema.dropTableIfExists(tables.userGroup);
	},
};