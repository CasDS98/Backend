const Koa = require('koa');
const Router = require('@koa/router');
const config = require('config');
const { getLogger } = require('./core/logging');
const bodyParser = require('koa-bodyparser');
const koaCors = require('@koa/cors');


const NODE_ENV = config.get('env');
const CORS_ORIGINS = config.get('cors.origins');
const CORS_MAX_AGE = config.get('cors.maxAge');
const LOG_LEVEL = config.get('log.level');
const LOG_DISABLED = config.get('log.disabled');

console.log(`log level ${LOG_LEVEL}, logs enabled: ${LOG_DISABLED !== true}`)

const app = new Koa();
const logger = getLogger();
const router = new Router();
const userService = require('./service/users');

app.use(bodyParser());
	
app.use(router.routes()).use(router.allowedMethods());

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

router.get('/api/users', async (ctx) => {
	logger.info(JSON.stringify(ctx.request));
	ctx.body = userService.getAll();
})

logger.info(`🚀 Server listening on http://localhost:9000`);
app.listen(9000);