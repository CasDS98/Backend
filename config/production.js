module.exports = {
	log: {
		level: 'info',
		disabled: false,
	},

	cors: {
		origins: ['http://localhost:3000'],
		maxAge: 3 * 60 * 60,
	},

	database: {
		client: 'mysql2',
		host: 'ID383529_chatapp.db.webhosting.be',
		port: 3306,
		name: '`ID383529_chatapp`',
		username: 'ID383529_chatapp',
	},
	auth:{
		argon : {
			saltLenght: 16,
			hashLenght: 32,
			timeCost : 6,
			memoryCost: 2 ** 17,
		},
		jwt: {
			secret: 'eenveeltemoeilijksecretdatniemandooitzalradenandersisdesitegehacked',
			expirationInterval: 60 * 60 * 1000, // ms (1 hour)
			issuer: 'chatapp.hogent.be',
			audience: 'chatapp.hogent.be',
		},
	}
};