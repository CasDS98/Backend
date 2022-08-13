module.exports = {
	log: {
		level: 'silly',
		disabled: false,
	},

	cors: {
		origins: ['https://hogent-web.github.io','https://hogent-web.github.io/frontendweb-karine-2122-CasDS98/','http://localhost:3000'],
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
		jwt: {
			secret: 'eenveeltemoeilijksecretdatniemandooitzalradenandersisdesitegehacked',
			expirationInterval: 60 * 60 * 1000, // ms (1 hour)
			issuer: 'chatapp.hogent.be',
			audience: 'chatapp.hogent.be',
		},
	}
};