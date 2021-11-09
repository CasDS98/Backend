module.exports = {
	seed: async (knex) => {
		// first delete all entries
		await knex('users').delete();

		// then add the fresh places
		await knex('users').insert([
		{ email: 'test1@hotmail.com', userName: 'test_1', password: '12345678' },
		{ email: 'test2@hotmail.com', userName: 'test_2', password: '87654321'  },
		{ email: 'test3@hotmail.com', userName: 'test_3', password: 'wachtwoord'  },
	]);
	},
};