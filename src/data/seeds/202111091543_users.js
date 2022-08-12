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
		{id: '23c1d4bb-2452-408c-b380-b61beed3d04a',  email: 'testa@hotmail.com', user_name: 'test_a', password: '$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4',roles: JSON.stringify([Role.ADMIN, Role.USER]), },
		{id: 'e56f7f75-990d-449c-9dd6-022bd7b48cba', email: 'testb@hotmail.com', user_name: 'test_b', password: '$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4', roles: JSON.stringify([Role.USER]),  },
		{id: 'bc61df90-1e20-48c1-9c13-fb26d2e2bfea', email: 'testc@hotmail.com', user_name: 'test_c', password: '$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4', roles: JSON.stringify([Role.USER]),  },
		{id: '23c1d4bb-2452-408c-b380-b61beed3d04b',  email: 'testd@hotmail.com', user_name: 'test_d', password: '$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4',roles: JSON.stringify([Role.ADMIN, Role.USER]), },
		{id: 'e56f7f75-990d-449c-9dd6-022bd7b48cbb', email: 'teste@hotmail.com', user_name: 'test_e', password: '$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4', roles: JSON.stringify([Role.USER]),  },
		{id: 'bc61df90-1e20-48c1-9c13-fb26d2e2bfeb', email: 'testf@hotmail.com', user_name: 'test_f', password: '$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4', roles: JSON.stringify([Role.USER]),  },
		{id: '23c1d4bb-2452-408c-b380-b61beed3d04c',  email: 'testg@hotmail.com', user_name: 'test_g', password: '$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4',roles: JSON.stringify([Role.ADMIN, Role.USER]), },
		{id: 'e56f7f75-990d-449c-9dd6-022bd7b48cbc', email: 'testh@hotmail.com', user_name: 'test_h', password: '$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4', roles: JSON.stringify([Role.USER]),  },
		{id: 'bc61df90-1e20-48c1-9c13-fb26d2e2bfec', email: 'testj@hotmail.com', user_name: 'test_j', password: '$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4', roles: JSON.stringify([Role.USER]),  },
		{id: '23c1d4bb-2452-408c-b380-a61beed3d046',  email: 'user1@hotmail.com', user_name: 'user_1', password: '$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4',roles: JSON.stringify([Role.ADMIN, Role.USER]), },
		{id: 'e56f7f75-990d-449c-9dd6-a22bd7b48cb3', email: 'user2@hotmail.com', user_name: 'user_2', password: '$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4', roles: JSON.stringify([Role.USER]),  },
		{id: 'bc61df90-1e20-48c1-9c13-ab26d2e2bfe2', email: 'user3@hotmail.com', user_name: 'user_3', password: '$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4', roles: JSON.stringify([Role.USER]),  },
		{id: '23c1d4bb-2452-408c-b380-a61beed3d04a',  email: 'usera@hotmail.com', user_name: 'user_a', password: '$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4',roles: JSON.stringify([Role.ADMIN, Role.USER]), },
		{id: 'e56f7f75-990d-449c-9dd6-a22bd7b48cba', email: 'userb@hotmail.com', user_name: 'user_b', password: '$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4', roles: JSON.stringify([Role.USER]),  },
		{id: 'bc61df90-1e20-48c1-9c13-ab26d2e2bfea', email: 'userc@hotmail.com', user_name: 'user_c', password: '$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4', roles: JSON.stringify([Role.USER]),  },
		{id: '23c1d4bb-2452-408c-b380-a61beed3d04b',  email: 'userd@hotmail.com', user_name: 'user_d', password: '$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4',roles: JSON.stringify([Role.ADMIN, Role.USER]), },
		{id: 'e56f7f75-990d-449c-9dd6-a22bd7b48cbb', email: 'usere@hotmail.com', user_name: 'user_e', password: '$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4', roles: JSON.stringify([Role.USER]),  },
		{id: 'bc61df90-1e20-48c1-9c13-ab26d2e2bfeb', email: 'userf@hotmail.com', user_name: 'user_f', password: '$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4', roles: JSON.stringify([Role.USER]),  },
		{id: '23c1d4bb-2452-408c-b380-a61beed3d04c',  email: 'userg@hotmail.com', user_name: 'user_g', password: '$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4',roles: JSON.stringify([Role.ADMIN, Role.USER]), },
		{id: 'e56f7f75-990d-449c-9dd6-a22bd7b48cbc', email: 'userh@hotmail.com', user_name: 'user_h', password: '$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4', roles: JSON.stringify([Role.USER]),  },
		{id: 'bc61df90-1e20-48c1-9c13-ab26d2e2bfec', email: 'userj@hotmail.com', user_name: 'Ditiseenheellangeusernaam', password: '$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4', roles: JSON.stringify([Role.USER]),  },
	]);
	},
};