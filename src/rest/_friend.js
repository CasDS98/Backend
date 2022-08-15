const Joi = require('joi'); 
const Router = require('@koa/router');
const friendService = require('../service/friend');
const { requireAuthentication } = require('../core/auth');
const validate = require('./_validation');


/**
 * @swagger
 * tags:
 *   name: Friends
 *   description: Represents a relation between two users
 */


/**
 * @swagger
 * /api/friends/:userId:
 *   get:
 *       summary: Get all friends
 *       description: Get all friends of user with userId
 *       tags:
 *       - Friends
 *       parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *          type: uuid
 *          required: true
 *          description: ID of wich users friends to get
 *       responses:
 *        200:
 *         description: Array of users that are friends
 *   
 
 */
const getAllFriends = async (ctx) => {
	ctx.body = await friendService.getAllFriends(ctx.params.userId);
	ctx.status=200;
};

getAllFriends.validationScheme = {
  params: {
    userId: Joi.string().uuid(),
  },
};

/**
 * @swagger
 * /api/friends:
 *   post:
 *       summary: create friends
 *       description: create a new friends relation
 *       tags:
 *       - Friends
 * 
 *       requestBodies:
 *        description: The ID's of the users to befriend.
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                user_a:
 *                  type: uuid
 *                user_b:
 *                  type: uuid
 *       responses:
 *        201:
 *         description: new friends
 *   
 
 */
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

/**
 * @swagger
 * /api/friends:
 *   delete:
 *     summary: delete friends
 *     description: delete a friends relation
 *     tags:
 *      - Friends
 *     requestBodies:
 *      Friends:
 *       description: The ID's of the users to defriend.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_a:
 *                 type: uuid
 *               user_b:
 *                 type: uuid
 *     responses:
 *      204:
 *       description: succesfully deleted friends relation
 *   
 
 */
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

	router.get('/:userId',requireAuthentication, validate(getAllFriends.validationScheme), getAllFriends);
	router.post('/',requireAuthentication, validate(createFriends.validationScheme), createFriends);
	router.delete('/',requireAuthentication, validate(deleteFriends.validationScheme), deleteFriends);

	app.use(router.routes()).use(router.allowedMethods());
};