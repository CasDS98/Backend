module.exports = {
	seed: async (knex) => {
		// first delete all entries
		await knex('user_group').delete();

		// then add the fresh places
		await knex('user_group').insert([
		  {id: 'a478cd08-700d-4b14-a8dd-c7028c5f6cc2',  user: '23c1d4bb-2452-408c-b380-b61beed3d046', group: '0573e6d9-d874-4eef-b611-339055e18379'},
      {id: '49baeb1d-baeb-405b-9b90-f62ba9c0e5c3',  user: 'e56f7f75-990d-449c-9dd6-022bd7b48cb3', group: '0573e6d9-d874-4eef-b611-339055e18379'},
      {id: '4e95e95f-f865-404a-8d5e-84c20fa9653e',  user: '23c1d4bb-2452-408c-b380-b61beed3d046', group: '319a8b52-56c0-4d34-ba94-6f33f2a0837a'},
      {id: 'b7577970-4d9b-42df-870c-eb9ec9ba8eeb',  user: 'bc61df90-1e20-48c1-9c13-fb26d2e2bfe2', group: '319a8b52-56c0-4d34-ba94-6f33f2a0837a'},
      {id: 'cc2058d2-16f2-496d-af52-93dc4a23d4ec',  user: '23c1d4bb-2452-408c-b380-b61beed3d046', group: '0141c873-ac3c-4a3f-a911-f32f31443727'},
      {id: 'e6f5e7f1-1548-4a9d-8b1d-af65c60d4ddb',  user: 'e56f7f75-990d-449c-9dd6-022bd7b48cb3', group: '0141c873-ac3c-4a3f-a911-f32f31443727'},
      {id: '694b0efd-0932-4be4-b2c8-56ae2a17e15c',  user: 'bc61df90-1e20-48c1-9c13-fb26d2e2bfe2', group: '0141c873-ac3c-4a3f-a911-f32f31443727'},
	]);
	},
};