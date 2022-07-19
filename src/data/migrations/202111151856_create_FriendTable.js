const { tables } = require('..');

module.exports = {
	up: async (knex) => {
    await knex.schema.createTable(tables.friend, (table) => {
      table.uuid('id').primary();

      table.uuid('user_a');
      table.uuid('user_b');
     
      table.foreign('user_a').references('user.id');
      table.foreign('user_b').references('user.id');
		});
	}, 
	down: (knex) => {
    return knex.schema.dropTableIfExists(tables.friend);
	},
};