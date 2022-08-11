
const { tables } = require('../../src/data');
const { withServer, login } = require('../supertest.setup.js');


const data = {
  groups: [  {id: '0573e6d9-d874-4eef-b611-339055e183a9',  name: 'test_1 / test_2'},
  {id: '319a8b52-56c0-4d34-ba94-6f33f2a083aa',  name: 'test_1 / test_3'},
  {id: '0141c873-ac3c-4a3f-a911-f32f314437a7',  name: 'group chat'},
  ],
  userGroups: [
    {id: 'a478cd08-700d-4b14-a8dd-c7028c5f6cc2',  user: '23c1d4bb-2452-408c-b380-b61beed3d046', group: '0573e6d9-d874-4eef-b611-339055e183a9'},
    {id: '49baeb1d-baeb-405b-9b90-f62ba9c0e5c3',  user: 'e56f7f75-990d-449c-9dd6-022bd7b48cb3', group: '0573e6d9-d874-4eef-b611-339055e183a9'},
    {id: '4e95e95f-f865-404a-8d5e-84c20fa9653e',  user: '23c1d4bb-2452-408c-b380-b61beed3d046', group: '319a8b52-56c0-4d34-ba94-6f33f2a083aa'},
    {id: 'b7577970-4d9b-42df-870c-eb9ec9ba8eeb',  user: 'bc61df90-1e20-48c1-9c13-fb26d2e2bfe2', group: '319a8b52-56c0-4d34-ba94-6f33f2a083aa'},
    {id: 'cc2058d2-16f2-496d-af52-93dc4a23d4ec',  user: '23c1d4bb-2452-408c-b380-b61beed3d046', group: '0141c873-ac3c-4a3f-a911-f32f314437a7'},
    {id: 'e6f5e7f1-1548-4a9d-8b1d-af65c60d4ddb',  user: 'e56f7f75-990d-449c-9dd6-022bd7b48cb3', group: '0141c873-ac3c-4a3f-a911-f32f314437a7'},
    {id: '694b0efd-0932-4be4-b2c8-56ae2a17e15c',  user: 'bc61df90-1e20-48c1-9c13-fb26d2e2bfe2', group: '0141c873-ac3c-4a3f-a911-f32f314437a7'},
]
};

const dataToDelete = {
  groups: [
    '0573e6d9-d874-4eef-b611-339055e183a9',
    '319a8b52-56c0-4d34-ba94-6f33f2a083aa',
    '0141c873-ac3c-4a3f-a911-f32f314437a7',
  ],

  userGroups: [
     'a478cd08-700d-4b14-a8dd-c7028c5f6cc2', 
     '49baeb1d-baeb-405b-9b90-f62ba9c0e5c3', 
     '4e95e95f-f865-404a-8d5e-84c20fa9653e', 
     'b7577970-4d9b-42df-870c-eb9ec9ba8eeb', 
     'cc2058d2-16f2-496d-af52-93dc4a23d4ec', 
     'e6f5e7f1-1548-4a9d-8b1d-af65c60d4ddb',  
     '694b0efd-0932-4be4-b2c8-56ae2a17e15c', 
  ],
};

describe('Groups', () => {
  let request;
  let knex;
  let loginHeader;

  withServer(({ knex: k, supertest:s }) => {
    knex = k;
    request = s;
  });

  beforeAll(async () => {
    loginHeader = await login(request);
  });

  const url = '/api/groups';
  describe('GET /api/groups/:userId', () => {

    beforeAll(async () => {
      await knex(tables.group).insert(data.groups);
      await knex(tables.userGroup).insert(data.userGroups);
    });

    afterAll(async () => {
      await knex(tables.userGroup)
      .whereIn('id', dataToDelete.userGroups)
      .delete();

        await knex(tables.group)
        .whereIn('id', dataToDelete.groups)
        .delete();
    });

    test('it should 200 and return all groups', async () => {
      const response = await request.get(`${url}/23c1d4bb-2452-408c-b380-b61beed3d046`)
        .set('Authorization', loginHeader);

      expect(response.status).toBe(200);
      expect(response.body.length).toBeGreaterThanOrEqual(3);
    });
  })

  describe('GET /api/members/:id', () => {

    beforeAll(async () => {
      await knex(tables.group).insert(data.groups);
      await knex(tables.userGroup).insert(data.userGroups);
    });

    afterAll(async () => {
      await knex(tables.userGroup)
      .whereIn('id', dataToDelete.userGroups)
      .delete();

        await knex(tables.group)
        .whereIn('id', dataToDelete.groups)
        .delete();
    });

    test('it should 200 and return all groups', async () => {
      const response = await request.get(`${url}/members/${data.groups[0].id}`)
        .set('Authorization', loginHeader);

      expect(response.status).toBe(200);
      expect(response.body.length).toBeGreaterThanOrEqual(2);
    });
  })

  describe('POST /api/groups', () => {

    const groupsToDelete = [];

    afterAll(async () => {
      await knex(tables.group)
        .whereIn('id', dataToDelete.groups)
        .delete();
    });

    test('it should 201 and return the created group', async () => {
      const response = await request.post(url)
        .set('Authorization', loginHeader)
        .send({
          name: 'a group name'
        });

      expect(response.status).toBe(201);
      expect(response.body.id).toBeTruthy();
      expect(response.body.name).toBe('a group name');

      groupsToDelete.push(response.body.id);
    });
  });

  describe('POST /api/groups/members', () => {

    const groupUsersToDelete = [];

    beforeAll(async () => {
      await knex(tables.group).insert(data.groups);
    });

    afterAll(async () => {
      await knex(tables.userGroup)
        .whereIn('id', groupUsersToDelete)
        .delete();

        await knex(tables.group)
        .whereIn('id', dataToDelete.groups)
        .delete();
    });

    test('it should 201 and return the created user_group', async () => {
      const response = await request.post(`${url}/members/${data.groups[0].id}`)
        .set('Authorization', loginHeader)
        .send({
          user_id: 'bc61df90-1e20-48c1-9c13-fb26d2e2bfe2'
        });

      expect(response.status).toBe(201);
      expect(response.body.id).toBeTruthy();
      expect(response.body.user).toBe('bc61df90-1e20-48c1-9c13-fb26d2e2bfe2');
      groupUsersToDelete.push(response.body.id);
    });

    test('it should 403', async () => {
      const response = await request.post(`${url}/members/${data.groups[0].id}`)
        .set('Authorization', loginHeader)
        .send({
          user_id: 'bc61df90-1e20-48c1-9c13-fb26d2e2bfe2'
        });

      expect(response.status).toBe(403);
    });
  });

  describe('DELETE /api/groups', () => {
    beforeAll(async () => {
      await knex(tables.group).insert(data.groups);
      await knex(tables.userGroup).insert(data.userGroups);
    });

    afterAll(async () => {
      await knex(tables.userGroup)
      .whereIn('id', dataToDelete.userGroups)
      .delete();

        await knex(tables.group)
        .whereIn('id', dataToDelete.groups)
        .delete();
    });


    test('it should 204 and return nothing', async () => {
      const response = await request.delete(`${url}/${data.groups[0].id}`)
        .set('Authorization', loginHeader);
      expect(response.status).toBe(204);
      expect(response.body).toEqual({});
    });
  });

  describe('DELETE /api/groups/members/:id', () => {
    beforeAll(async () => {
      await knex(tables.group).insert(data.groups);
      await knex(tables.userGroup).insert(data.userGroups);
    });

    afterAll(async () => {
      await knex(tables.userGroup)
      .whereIn('id', dataToDelete.userGroups)
      .delete();

        await knex(tables.group)
        .whereIn('id', dataToDelete.groups)
        .delete();
    });


    test('it should 204 and return nothing', async () => {
      const response = await request.delete(`${url}/members/${data.groups[0].id}`)
        .set('Authorization', loginHeader)
        .send({
          user_id: '23c1d4bb-2452-408c-b380-b61beed3d046'
        });

      expect(response.status).toBe(204);
      expect(response.body).toEqual({});
    });
  });
});

