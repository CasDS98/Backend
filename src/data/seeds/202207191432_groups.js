module.exports = {
	seed: async (knex) => {
		// first delete all entries
		await knex('group').delete();

		// then add the fresh places
		await knex('group').insert([
		  {id: '0573e6d9-d874-4eef-b611-339055e18379',  name: 'test_1 / test_2'},
      {id: '319a8b52-56c0-4d34-ba94-6f33f2a0837a',  name: 'test_1 / test_3'},
      {id: '0141c873-ac3c-4a3f-a911-f32f31443727',  name: 'group chat'},
	]);
	},
};