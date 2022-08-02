const Role = require('../../core/roles');

module.exports = {
	seed: async (knex) => {
		// first delete all entries
		await knex('user').delete();

		// then add the fresh places
		await knex('user').insert([
		{id: '23c1d4bb-2452-408c-b380-b61beed3d046',  email: 'test1@hotmail.com', user_name: 'test_1', password: '$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4',roles: JSON.stringify([Role.ADMIN, Role.USER]), },
		{id: 'e56f7f75-990d-449c-9dd6-022bd7b48cb3', email: 'test2@hotmail.com', user_name: 'test_2', password: '$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4', roles: JSON.stringify([Role.USER]),  },
		{id: 'bc61df90-1e20-48c1-9c13-fb26d2e2bfe2', email: 'test3@hotmail.com', user_name: 'test_3', password: '$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4', roles: JSON.stringify([Role.USER]),  },
	]);
	},
};