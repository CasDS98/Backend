const { tables } = require('..');

module.exports = {
	up: async (knex) => {
    await knex.schema.createTable(tables.userGroup, (table) => {
      table.uuid('id').primary;
      table.uuid('user');
      table.uuid('group');
      table.foreign('user').references('user.id').onDelete('CASCADE');
      table.foreign('group').references('group.id').onDelete('CASCADE');
		});
	}, 
	down: (knex) => {
    return knex.schema.dropTableIfExists(tables.userGroup);
	},
};