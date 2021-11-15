const { tables } = require('..');

module.exports = {
	up: async (knex) => {
    await knex.schema.table(tables.message, (table) => {
			table.dropPrimary()
			table.primary(['dateTime','user','groupID'])
		});
	}, 
	down: (knex) => {
    return;
	},
};