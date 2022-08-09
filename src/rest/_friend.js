const Joi = require('joi'); 
const Router = require('@koa/router');
const friendService = require('../service/friend');
const { requireAuthentication } = require('../core/auth');
const validate = require('./_validation');

const getAllFriends = async (ctx) => {
	ctx.body = await friendService.getAllFriends(ctx.params.userId);
};

getAllFriends.validationScheme = {
  params: {
    userId: Joi.string().uuid(),
  },
};


const createFriends = async (ctx) => {
	const newFriends = await friendService.create({
		...ctx.request.body,
	});
	ctx.body = newFriends;
	ctx.status=201;
};

createFriends.validationScheme = {
  body: {
    user_a: Joi.string().uuid(),
		user_b: Joi.string().uuid()
  },
};


const deleteFriends = async (ctx) => {
	await friendService.deleteByUserIds({
		...ctx.request.body,
	});
	ctx.status = 204;
};

deleteFriends.validationScheme = {
  body: {
    user_a: Joi.string().uuid(),
		user_b: Joi.string().uuid()
  },
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

	router.get('/:userId',requireAuthentication, validate(login.getAllFriends), getAllFriends);
	router.post('/',requireAuthentication, validate(login.createFriends), createFriends);
	router.delete('/',requireAuthentication, validate(login.deleteFriends), deleteFriends);

	app.use(router.routes()).use(router.allowedMethods());
};