const Router = require('@koa/router');
const friendService = require('../service/friend');

const getAllFriends = async (ctx) => {
	ctx.body = await friendService.getAllFriends(ctx.params.userId);
};

const createFriends = async (ctx) => {
	const newFriends = await friendService.create({
		...ctx.request.body,
	});
	ctx.body = newFriends;
	ctx.status=201;
};

const deleteFriends = async (ctx) => {
	await friendService.deleteByUserIds({
		...ctx.request.body,
	});
	ctx.status = 204;
};

/**
 * Install friend routes in the given router.
 *
 * @param {Router} app - The parent router.
 */
 module.exports = (app) => {
	const router = new Router({
		prefix: '/friends',
	});

	router.get('/:userId', getAllFriends);
	router.post('/', createFriends);
	router.delete('/', deleteFriends);

	app.use(router.routes()).use(router.allowedMethods());
};