module.exports = {
	log: {
		level: 'silly',
		disabled: false,
	},

	cors: {
		origins: ['http://localhost:3000'],
		maxAge: 3 * 60 * 60,
	},

	database: {
		client: 'mysql2',
		host: 'localhost',
		port: 3306,
		name: 'chatapp',
		username: 'root',
		password: process.env.DBPWD,
	},
	auth:{
		argon : {
			saltLenght: 16,
			hashLenght: 32,
			timeCost : 6,
			memoryCost: 2 ** 17,
		},
	}
};