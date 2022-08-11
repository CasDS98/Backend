const config = require('config');

const { initializeData, getKnex, tables } = require('../src/data');
const { initializeLogger } = require('../src/core/logging');
const Role = require('../src/core/roles');


module.exports = async () => {
  // Create a database connection
  initializeLogger({
    level: config.get('log.level'),
    disabled: config.get('log.disabled'),
  });
  await initializeData();

  const knex = getKnex();

  // Insert test users with password 12345678
  await knex(tables.user).insert([{
    id: '7f28c5f9-d711-4cd6-ac15-d13d71abff80',
    user_name: 'Test User',
    email: 'test.user@hogent.be',
    password:
      '$argon2id$v=19$m=2048,t=2,p=1$NF6PFLTgSYpDSex0iFeFQQ$Rz5ouoM9q3EH40hrq67BC3Ajsu/ohaHnkKBLunELLzU',
    roles: JSON.stringify([Role.USER]),
  },
  {
    id: '7f28c5f9-d711-4cd6-ac15-d13d71abffaa',
    user_name: 'Admin User',
    email: 'admin.user@hogent.be',
    password:
      '$argon2id$v=19$m=2048,t=2,p=1$NF6PFLTgSYpDSex0iFeFQQ$Rz5ouoM9q3EH40hrq67BC3Ajsu/ohaHnkKBLunELLzU',
    roles: JSON.stringify([Role.ADMIN, Role.USER]),
  },
  {id: '23c1d4bb-2452-408c-b380-b61beed3d046',  email: 'test1@hotmail.com', user_name: 'test_1', password: '$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4',roles: JSON.stringify([Role.ADMIN, Role.USER]), },
		{id: 'e56f7f75-990d-449c-9dd6-022bd7b48cb3', email: 'test2@hotmail.com', user_name: 'test_2', password: '$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4', roles: JSON.stringify([Role.USER]),  },
		{id: 'bc61df90-1e20-48c1-9c13-fb26d2e2bfe2', email: 'test3@hotmail.com', user_name: 'test_3', password: '$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4', roles: JSON.stringify([Role.USER]),  },
]);
};