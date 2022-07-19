module.exports = {
	seed: async (knex) => {
		// first delete all entries
		await knex('friend').delete();

		// then add the fresh places
		await knex('friend').insert([
		  {id: '6b69ba71-6ee9-4d86-a398-5ea3286ec2d8',  user_a: '23c1d4bb-2452-408c-b380-b61beed3d046', user_b: 'e56f7f75-990d-449c-9dd6-022bd7b48cb3'},
      {id: 'd1d3f258-143c-49ed-9696-b9c34bbe9b8d',  user_a: '23c1d4bb-2452-408c-b380-b61beed3d046', user_b: 'bc61df90-1e20-48c1-9c13-fb26d2e2bfe2'},
	]);
	},
};