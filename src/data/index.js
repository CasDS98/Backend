const config = require('config');
const knex = require('knex');
const { join } = require('path');

const { getChildLogger } = require('../core/logging');

let knexInstance;

const NODE_ENV = config.get('env');
const isDevelopment = NODE_ENV === 'development';

const DATABASE_CLIENT = config.get('database.client');
const DATABASE_NAME = config.get('database.name');
const DATABASE_HOST = config.get('database.host');
const DATABASE_PORT = config.get('database.port');
const DATABASE_USERNAME = config.get('database.username');
const DATABASE_PASSWORD = config.get('database.password');

async function initializeData() {

	const logger = getChildLogger('database');
  logger.info('Initializing connection to the database');

  const knexOptions = {
		client: DATABASE_CLIENT,
		connection: {
			host: DATABASE_HOST,
			port: DATABASE_PORT,
			database: DATABASE_NAME,
			user: DATABASE_USERNAME,
			password: DATABASE_PASSWORD,
			insecureAuth: isDevelopment,
		},
		migrations: {
			tableName: 'knex_meta',
			directory: join('src', 'data', 'migrations')
		},
		seeds: {
			directory: join('src', 'data', 'seeds')
		}
  };
  
  knexInstance = knex(knexOptions);

	try {
		await knexInstance.raw('SELECT 1+1 AS result');
	} catch (error) {
		logger.error(error.message, { error });
		throw new Error('Could not initialize the data layer');
	}
	// Run migrations
let migrationsFailed = true;
try {
	await knexInstance.migrate.latest();
	migrationsFailed = false;
} catch (error) {
	logger.error('Error while migrating the database', {
		error,
	});
}

// Undo last migration if something failed
if (migrationsFailed) {
	try {
		await knexInstance.migrate.down();
	} catch (error) {
		logger.error('Error while undoing last migration', {
			error,
		});
	}

	// No point in starting the server
	throw new Error('Migrations failed');
}

if (isDevelopment) {
	try {
		await knexInstance.seed.run();
	} catch (error) {
		logger.error('Error while seeding database', {
			error,
		});
	}
}

	return knexInstance;
}

function getKnex() {
	if (!knexInstance) throw new Error('Please initialize the data layer before getting the Knex instance');
	return knexInstance;
}

const tables = Object.freeze({
	user: 'user',
	group: 'group',
	message: 'message',
	friend: 'friend',
	userGroup: 'user_group',
});

module.exports = {
  initializeData,
  tables,
  getKnex,
};
