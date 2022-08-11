
const { tables } = require('../../src/data');
const { withServer, login } = require('../supertest.setup.js');

const data = {
  friends: [{
    id: '7f28c5f9-d711-4cd6-ac15-d13d71abff83',
    user_a: '23c1d4bb-2452-408c-b380-b61beed3d046',
    user_b: 'e56f7f75-990d-449c-9dd6-022bd7b48cb3'
  },
  {
    id: '7f28c5f9-d711-4cd6-ac15-d13d71abff84',
    user_a: '23c1d4bb-2452-408c-b380-b61beed3d046', 
    user_b: 'bc61df90-1e20-48c1-9c13-fb26d2e2bfe2'
  },
  {
    id: '7f28c5f9-d711-4cd6-ac15-d13d71abff85',
    user_a: 'e56f7f75-990d-449c-9dd6-022bd7b48cb3', 
    user_b: 'bc61df90-1e20-48c1-9c13-fb26d2e2bfe2'
  },
  ],
};

const dataToDelete = {
  friends: [
    '7f28c5f9-d711-4cd6-ac15-d13d71abff83',
    '7f28c5f9-d711-4cd6-ac15-d13d71abff84',
    '7f28c5f9-d711-4cd6-ac15-d13d71abff85',
  ],
};

describe('Friends', () => {
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

  const url = '/api/friends';

  describe('GET /api/friends/:userId', () => {

    beforeAll(async () => {
      await knex(tables.friend).insert(data.friends);
    });

    afterAll(async () => {
      await knex(tables.friend)
        .whereIn('id', dataToDelete.friends)
        .delete();
    });

    test('it should 200 and return all friends', async () => {
      const response = await request.get(`${url}/${data.friends[0].user_a}`)
        .set('Authorization', loginHeader);

      expect(response.status).toBe(200);
      expect(response.body.data.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe('POST /api/friends', () => {

    const friendsToDelete = [];

    afterAll(async () => {
      await knex(tables.friend)
        .whereIn('id', friendsToDelete)
        .delete();
    });

    test('it should 201 and return the created friends', async () => {
      const response = await request.post(url)
        .set('Authorization', loginHeader)
        .send({
          user_a: '7f28c5f9-d711-4cd6-ac15-d13d71abff80',
          user_b: '7f28c5f9-d711-4cd6-ac15-d13d71abffaa'
        });

      expect(response.status).toBe(201);
      expect(response.body.id).toBeTruthy();

      friendsToDelete.push(response.body.id);
    });

    test('it should 500', async () => {
      const response = await request.post(url)
        .set('Authorization', loginHeader)
        .send({
          user_a: '7f28c5f9-d711-4cd6-ac15-d13d71abff80',
          user_b: '7f28c5f9-d711-4cd6-ac15-d13d71abffaa'
        });

      expect(response.status).toBe(500);

    });
  });

  describe('DELETE /api/friends', () => {

    beforeAll(async () => {
      await knex(tables.friend).insert(data.friends);
    });

    afterAll(async () => {
      await knex(tables.friend)
        .whereIn('id', dataToDelete.friends)
        .delete();
    });

    test('it should 204 and return nothing', async () => {
      const response = await request.delete(`${url}`)
        .set('Authorization', loginHeader)
        .send({
          user_a: '7f28c5f9-d711-4cd6-ac15-d13d71abff80',
          user_b: '7f28c5f9-d711-4cd6-ac15-d13d71abffaa'
        });
      expect(response.status).toBe(204);
      expect(response.body).toEqual({});
    });

    test('it should 204 and return nothing', async () => {
      const response = await request.delete(`${url}`)
        .set('Authorization', loginHeader)
        .send({
          user_b: 'e56f7f75-990d-449c-9dd6-022bd7b48cb3', 
          user_a: 'bc61df90-1e20-48c1-9c13-fb26d2e2bfe2'
        });
      expect(response.status).toBe(204);
      expect(response.body).toEqual({});
    });

  });
  
});