const Koa = require('koa');
const Router = require('@koa/router');
const config = require('config');
const bodyParser = require('koa-bodyparser');
const koaCors = require('@koa/cors');
const { initializeLogger, getLogger } = require('./core/logging');
const { initializeData } = require('./data');
const installRest = require('./rest');
const socketIo = require("socket.io");


const NODE_ENV = config.get('env');
const CORS_ORIGINS = config.get('cors.origins');
const CORS_MAX_AGE = config.get('cors.maxAge');
const LOG_LEVEL = config.get('log.level');
const LOG_DISABLED = config.get('log.disabled');

console.log(`log level ${LOG_LEVEL}, logs enabled: ${LOG_DISABLED !== true}`)


async function main() {
	// logger initialiseren
	initializeLogger({
		level: LOG_LEVEL,
		disabled: LOG_DISABLED,
		isProduction: NODE_ENV === 'production',
		defaultMeta: { NODE_ENV },
	});

	await initializeData();
	
	const app = new Koa();

	app.use(
		koaCors({
			origin: (ctx) => {
				if (CORS_ORIGINS.indexOf(ctx.request.header.origin) !== -1) {
					return ctx.request.header.origin;
				}
				// Not a valid domain at this point, let's return the first valid as we should return a string
				return CORS_ORIGINS[0];
			},
			allowHeaders: ['Accept', 'Content-Type', 'Authorization'],
			maxAge: CORS_MAX_AGE,
		})
	);

	const logger = getLogger();
	
	app.use(bodyParser());

	installRest(app);


	logger.info(`🚀 Server listening on http://localhost:9000`);
	const  server = require('http').createServer(app.callback())
	const  io = socketIo(server, {
		cors: {
			origin: "http://localhost:3000",
			methods: ["GET", "POST"]
		}
	});
	server.listen("9000");


	
	io.on('connection', (socket) => {
	  	console.log(`USER CONNECTED WITH ID : ${socket.id}`);

			socket.on('join_room', (data) => {
					socket.join(data);
					console.log(`USER JOINED ROOM ${data}`);
			})

			socket.on('send_message', (data) => {
				console.log(`USER SEND MESSAGE`);
				socket.to(data.room).emit('receive_message', data.message);
		})

			socket.on('disconnect', () => {
				console.log('USER DISCONNECTED');
			})
	})

}

main();