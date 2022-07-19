module.exports = {
	seed: async (knex) => {
		// first delete all entries
		await knex('message').delete();

		// then add the fresh places
		await knex('message').insert([
		  {id: '93d310f7-8e41-4af8-8fd2-e791876a7465',  date_time: '2020-01-01 00:00:00', user : '23c1d4bb-2452-408c-b380-b61beed3d046', group: '0573e6d9-d874-4eef-b611-339055e18379', value : 'user one to user two'},
      {id: '8f8709ab-54d4-46a9-9429-0b34b38442d4',  date_time: '2020-01-01 00:00:10', user : '23c1d4bb-2452-408c-b380-b61beed3d046', group: '319a8b52-56c0-4d34-ba94-6f33f2a0837a', value : 'user one to user three'},
      {id: 'e3ccbff8-edef-469e-848c-7d8885c05000',  date_time: '2020-01-01 00:00:05', user : '23c1d4bb-2452-408c-b380-b61beed3d046', group: '0141c873-ac3c-4a3f-a911-f32f31443727', value : 'user one to group chat'},
      {id: 'afb8e128-c672-4e0d-9583-129e621fe743',  date_time: '2020-01-01 00:00:05', user : 'e56f7f75-990d-449c-9dd6-022bd7b48cb3', group: '0573e6d9-d874-4eef-b611-339055e18379', value : 'user two to user one'},
      {id: 'cc9fa895-f44e-4f04-9200-418d40e34876',  date_time: '2020-01-01 00:00:00', user : 'e56f7f75-990d-449c-9dd6-022bd7b48cb3', group: '0141c873-ac3c-4a3f-a911-f32f31443727', value : 'user two to group chat'},
      {id: '0fedea2a-f160-438c-8e51-679c6adf0954',  date_time: '2020-01-01 00:00:00', user : 'bc61df90-1e20-48c1-9c13-fb26d2e2bfe2', group: '319a8b52-56c0-4d34-ba94-6f33f2a0837a', value : 'user three to user one'},
      {id: '517488ed-b27b-456d-91fe-4b9febdcc514',  date_time: '2020-01-01 00:00:10', user : 'bc61df90-1e20-48c1-9c13-fb26d2e2bfe2', group: '0141c873-ac3c-4a3f-a911-f32f31443727', value : 'user three to group chat'},
	]);
	},
};