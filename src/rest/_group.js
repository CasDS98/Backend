const Joi = require('joi'); 
const Router = require('@koa/router');
const groupService = require('../service/group');
const { requireAuthentication } = require('../core/auth');
const validate = require('./_validation');


/**
 * @swagger
 * tags:
 *   name: Groups
 *   description: Represents a group of users 
 */

/**
 * @swagger
 * /api/groups/:userId:
 *   get:
 *       summary: Get all groups
 *       description: Get all groups where user with userId is a part of
 *       tags:
 *       - Groups
 *       parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *          type: uuid
 *          required: true
 *          description: ID of wich users groups to get
 *       responses:
 *        200:
 *         description: Array of groups
 *   
 
 */

const getAllGroups = async (ctx) => {
	ctx.body = await groupService.getAllGroups(ctx.params.userId);
};

getAllGroups.validationScheme = {
  params: {
    userId: Joi.string().uuid(),
  },
};

/**
 * @swagger
 * /api/groups:
 *   post:
 *       summary: create a group
 *       description: create a new group
 *       tags:
 *       - Groups
 * 
 *       requestBodies:
 *        description: The name of the new group
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *       responses:
 *        201:
 *         description: The new group
 *   
 
 */
const createGroup = async (ctx) => {
	const newGroup = await groupService.create({
		...ctx.request.body,
	});
	ctx.body = newGroup;
	ctx.status=201;
};

createGroup.validationScheme = {
  body: {
    name: Joi.string().max(255)
  },
};

/**
 * @swagger
 * /api/groups/:id:
 *   delete:
 *     summary: delete a group
 *     description: delete a group with given id
 *     tags:
 *      - Groups
 * 
 *     parameters:
 *     - in: path
 *       name: id
 *       schema:
 *        type: uuid
 *        required: true
 *        description: ID of wich group to delete
 * 
 *     responses:
 *      204:
 *       description: succesfully deleted the group
 *   
 
 */
const deleteGroup = async (ctx) => {
	await groupService.deleteById(ctx.params.id);
	ctx.status = 204;
};

deleteGroup.validationScheme = {
	params: {
    id: Joi.string().uuid(),
  },
};

/**
 * @swagger
 * /api/groups/members/:id:
 *   get:
 *       summary: Get all members
 *       description: Get all the users in a group
 *       tags:
 *       - Groups
 *       parameters:
 *       - in: path
 *         name: id
 *         schema:
 *          type: uuid
 *          required: true
 *          description: ID of the group of wich members to get
 *       responses:
 *        200:
 *         description: Array of users
 *   
 
 */
const getAllMembers = async (ctx) => {
	ctx.body = await groupService.getAllMembers(ctx.params.id);
};

getAllMembers.validationScheme = {
	params: {
    id: Joi.string().uuid(),
  },
};

/**
 * @swagger
 * /api/groups/members/:id:
 *   post:
 *       summary: Add member
 *       description: Add a user to a group
 *       tags:
 *       - Groups
 *       parameters:
 *       - in: path
 *         name: id
 *         schema:
 *          type: uuid
 *          required: true
 *          description: ID of the group 
 * 
 *       requestBodies:
 *        description: Id of the user to add
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                user_id:
 *                  type: uuid
 *       responses:
 *        201:
 *         description: The user
 *   
 
 */
const addMember = async (ctx) => {
	ctx.body = await groupService.addMember(ctx.params.id,{
		...ctx.request.body,
	});
	ctx.status = 201;
};

addMember.validationScheme = {
	params: {
    id: Joi.string().uuid(),
  },
  body: {
    user_id: Joi.string().uuid()
  },
};

/**
 * @swagger
 * /api/groups/members/:id:
 *   delete:
 *       summary: Remove member
 *       description: remove a user from a group
 *       tags:
 *       - Groups
 *       parameters:
 *       - in: path
 *         name: id
 *         schema:
 *          type: uuid
 *          required: true
 *          description: ID of the group 
 * 
 *       requestBodies:
 *        description: Id of the user to remove
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                user_id:
 *                  type: uuid
 *       responses:
 *        204:
 *         description: The user was succesfully removed
 *   
 
 */
const deleteMember = async (ctx) => {
	await groupService.deleteMember(ctx.params.id,{
		...ctx.request.body,
	});
	ctx.status = 204;
};

deleteMember.validationScheme = {
	params: {
    id: Joi.string().uuid(),
  },
  body: {
    user_id: Joi.string().uuid(),
  },
};

/**
 * Install group routes in the given router.
 *
 * @param {Router} app - The parent router.
 */
 module.exports = (app) => {
	const router = new Router({
		prefix: '/groups',
	});

	router.get('/:userId',requireAuthentication, validate(getAllGroups.validationScheme), getAllGroups);
  router.get('/members/:id',requireAuthentication, validate(getAllMembers.validationScheme), getAllMembers);
	router.post('/',requireAuthentication, validate(createGroup.validationScheme), createGroup);
  router.delete('/:id',requireAuthentication, validate(deleteGroup.validationScheme), deleteGroup);
  router.post('/members/:id',requireAuthentication, validate(addMember.validationScheme), addMember);
  router.delete('/members/:id',requireAuthentication, validate(deleteMember.validationScheme), deleteMember);

	app.use(router.routes()).use(router.allowedMethods());
};