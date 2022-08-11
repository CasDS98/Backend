
const { tables } = require('../../src/data');
const { withServer, login } = require('../supertest.setup.js');


const data = {
  messages: [ {id: '93d310f7-8e41-4af8-8fd2-e791876a7465',  date_time: '2020-01-01 00:00:00', user : '23c1d4bb-2452-408c-b380-b61beed3d046', group: '0573e6d9-d874-4eef-b611-339055e18379', value : 'user one to user two'},
  {id: '8f8709ab-54d4-46a9-9429-0b34b38442d4',  date_time: '2020-01-01 00:00:10', user : '23c1d4bb-2452-408c-b380-b61beed3d046', group: '319a8b52-56c0-4d34-ba94-6f33f2a0837a', value : 'user one to user three'},
  {id: 'e3ccbff8-edef-469e-848c-7d8885c05000',  date_time: '2020-01-01 00:00:05', user : '23c1d4bb-2452-408c-b380-b61beed3d046', group: '0141c873-ac3c-4a3f-a911-f32f31443727', value : 'user one to group chat'},
  {id: 'afb8e128-c672-4e0d-9583-129e621fe743',  date_time: '2020-01-01 00:00:05', user : 'e56f7f75-990d-449c-9dd6-022bd7b48cb3', group: '0573e6d9-d874-4eef-b611-339055e18379', value : 'user two to user one'},
  {id: 'cc9fa895-f44e-4f04-9200-418d40e34876',  date_time: '2020-01-01 00:00:00', user : 'e56f7f75-990d-449c-9dd6-022bd7b48cb3', group: '0141c873-ac3c-4a3f-a911-f32f31443727', value : 'user two to group chat'},
  {id: '0fedea2a-f160-438c-8e51-679c6adf0954',  date_time: '2020-01-01 00:00:00', user : 'bc61df90-1e20-48c1-9c13-fb26d2e2bfe2', group: '319a8b52-56c0-4d34-ba94-6f33f2a0837a', value : 'user three to user one'},
  {id: '517488ed-b27b-456d-91fe-4b9febdcc514',  date_time: '2020-01-01 00:00:10', user : 'bc61df90-1e20-48c1-9c13-fb26d2e2bfe2', group: '0141c873-ac3c-4a3f-a911-f32f31443727', value : 'user three to group chat'},
  ],
  groups: [  {id: '0573e6d9-d874-4eef-b611-339055e18379',  name: 'test_1 / test_2'},
  {id: '319a8b52-56c0-4d34-ba94-6f33f2a0837a',  name: 'test_1 / test_3'},
  {id: '0141c873-ac3c-4a3f-a911-f32f31443727',  name: 'group chat'},
  ],
};

const dataToDelete = {
  messages: [
    '93d310f7-8e41-4af8-8fd2-e791876a7465',
    '8f8709ab-54d4-46a9-9429-0b34b38442d4',
    'e3ccbff8-edef-469e-848c-7d8885c05000',
    'afb8e128-c672-4e0d-9583-129e621fe743',  
    'cc9fa895-f44e-4f04-9200-418d40e34876', 
    '0fedea2a-f160-438c-8e51-679c6adf0954',
    '517488ed-b27b-456d-91fe-4b9febdcc514',
  ],
  groups: [
    '0573e6d9-d874-4eef-b611-339055e18379',
    '319a8b52-56c0-4d34-ba94-6f33f2a0837a',
    '0141c873-ac3c-4a3f-a911-f32f31443727',
  ],
};

describe('Messages', () => {
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

  const url = '/api/messages';

  describe('GET /api/messages/:groupId', () => {

    beforeAll(async () => {
      await knex(tables.group).insert(data.groups);
      await knex(tables.message).insert(data.messages);
     
    });

    afterAll(async () => {
      await knex(tables.message)
        .whereIn('id', dataToDelete.messages)
        .delete();

        await knex(tables.group)
        .whereIn('id', dataToDelete.groups)
        .delete();
    });

    test('it should 200 and return all messages', async () => {
      const response = await request.get(`${url}/${data.messages[0].group}`)
        .set('Authorization', loginHeader);

      expect(response.status).toBe(200);
      expect(response.body.data.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe('POST /api/messages', () => {

    const messagesToDelete = [];
    beforeAll(async () => {
      await knex(tables.group).insert(data.groups);
      await knex(tables.message).insert(data.messages);
     
    });

    afterAll(async () => {
      await knex(tables.message)
        .whereIn('id', messagesToDelete)
        .delete();

        await knex(tables.group)
        .whereIn('id', dataToDelete.groups)
        .delete();
    });

    test('it should 201 and return the created place', async () => {
      const response = await request.post(url)
        .set('Authorization', loginHeader)
        .send({
          user_id : '23c1d4bb-2452-408c-b380-b61beed3d046',
          group_id : '319a8b52-56c0-4d34-ba94-6f33f2a0837a',
          message : 'This is a test message'
        });

      expect(response.status).toBe(201);
      expect(response.body.id).toBeTruthy();
      expect(response.body.date_time).toBeTruthy();
      expect(response.body.user).toBe('23c1d4bb-2452-408c-b380-b61beed3d046');
      expect(response.body.group).toBe('319a8b52-56c0-4d34-ba94-6f33f2a0837a');
      expect(response.body.value).toBe('This is a test message');

      messagesToDelete.push(response.body.id);
    });

    test('it should 400', async () => {
      const response = await request.post(url)
        .set('Authorization', loginHeader)
        .send({
          user_id : '23c1d4bb-2452-408c-b380-b61beed3d046',
          group_id : '319a8b52-56c0-4d34-ba94-6f33f2a0837a',
          message : 'This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message'
        });

      expect(response.status).toBe(400);
    });
  
  });

  describe('DELETE /api/messages', () => {
    beforeAll(async () => {
      await knex(tables.group).insert(data.groups);
      await knex(tables.message).insert(data.messages);
     
    });

    afterAll(async () => {
      await knex(tables.message)
        .whereIn('id', dataToDelete.messages)
        .delete();

        await knex(tables.group)
        .whereIn('id', dataToDelete.groups)
        .delete();
    });


    test('it should 204 and return nothing', async () => {
      const response = await request.delete(`${url}/${data.messages[0].id}`)
        .set('Authorization', loginHeader);
      expect(response.status).toBe(204);
      expect(response.body).toEqual({});
    });
  });

  describe('PUT /api/messages/:id', () => {

    beforeAll(async () => {
      await knex(tables.group).insert(data.groups);
      await knex(tables.message).insert(data.messages);
     
    });

    afterAll(async () => {
      await knex(tables.message)
        .whereIn('id', dataToDelete.messages)
        .delete();

        await knex(tables.group)
        .whereIn('id', dataToDelete.groups)
        .delete();
    });

    test('it should 200 and return the updated transaction', async () => {
      const response = await request.put(`${url}/93d310f7-8e41-4af8-8fd2-e791876a7465`)
        .set('Authorization', loginHeader)
        .send({
          message: 'test',
        });

        expect(response.status).toBe(200);
        expect(response.body.id).toBeTruthy();
        expect(response.body.date_time).toBeTruthy();
        expect(response.body.user).toBe('23c1d4bb-2452-408c-b380-b61beed3d046');
        expect(response.body.group).toBe('0573e6d9-d874-4eef-b611-339055e18379');
        expect(response.body.value).toBe('test');
    });
  });
});