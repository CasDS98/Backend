const Joi = require('joi'); 
const Router = require('@koa/router');
const messageService = require('../service/message');
const { requireAuthentication } = require('../core/auth');
const validate = require('./_validation');
const { unauthorized } = require('../core/serviceError');


/**
 * @swagger
 * tags:
 *   name: Messages
 *   description: Represents a text messages send by users 
 */

/**
 * @swagger
 * /api/messages:
 *   post:
 *       summary: create a message
 *       description: Creation of a new text message
 *       tags:
 *       - Messages
 * 
 *       requestBodies:
 *        description: The message information
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                value:
 *                  type: string
 *                user_id:
 *                  type: uuid
 *                group_id:
 *                  type: uuid
 *       responses:
 *        201:
 *         description: The new message
 *   
 
 */
const createMessage = async (ctx) => {
	const message = await messageService.create({
		...ctx.request.body,
	});
	ctx.body = message;
	ctx.status=201;
};

createMessage.validationScheme = {
  body: {
    user_id: Joi.string().uuid(),
    group_id: Joi.string().uuid(),
    message: Joi.string().max(300),
  },
};

/**
 * @swagger
 * /api/messages/:id:
 *   delete:
 *     summary: delete a message
 *     description: delete a message with given id
 *     tags:
 *      - Messages
 * 
 *     parameters:
 *     - in: path
 *       name: id
 *       schema:
 *        type: uuid
 *        required: true
 *        description: ID of message to delete
 * 
 *     responses:
 *      204:
 *       description: succesfully deleted the message
 *   
 
 */
const deleteMessageById = async (ctx) => {
  await messageService.deleteById(ctx.params.id);
  ctx.status = 204;
};

deleteMessageById.validationScheme = {
  params: {
    id: Joi.string().uuid(),
  },
};

/**
 * @swagger
 * /api/messages/:id:
 *   put:
 *       summary: update a message
 *       description: Update of message with given id
 *       tags:
 *       - Messages
 * 
 *       parameters:
 *       - in: path
 *         name: id
 *         schema:
 *          type: uuid
 *          required: true
 *          description: ID of message to update
 * 
 *       requestBodies:
 *        description: The message information
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                value:
 *                  type: string
 *               
 *       responses:
 *        201:
 *         description: The updated message
 *   
 
 */
const updateMessageById = async (ctx) => {
  const message = await messageService.updateById(ctx.params.id, ctx.request.body);
  ctx.body = message;
  ctx.status = 200;
};

updateMessageById.validationScheme = {
  params: {
    id: Joi.string().uuid(),
  },
  body: {
    message: Joi.string().max(300)
  },
};

/**
 * @swagger
 * /api/messages/:groupId:
 *   get:
 *       summary: Get all messages
 *       description: Get all messages of group with groupId 
 *       tags:
 *       - Messages
 *       parameters:
 *       - in: path
 *         name: groupId
 *         schema:
 *          type: uuid
 *          required: true
 *          description: ID of group
 *       responses:
 *        200:
 *         description: Array of messages
 *   
 
 */
const getAllGroupMessages = async (ctx) => {
  const message = await messageService.getAllGroup(
    ctx.query.limit && Number(ctx.query.limit),
    ctx.query.offset && Number(ctx.query.offset),
    ctx.params.groupId);
  ctx.body = message;
};

getAllGroupMessages.validationScheme = {
  query: Joi.object({
    limit: Joi.number().integer().positive().max(1000).optional(),
    offset: Joi.number().integer().min(0).optional(),
  }).and('limit', 'offset'),

  params: {
    groupId: Joi.string().uuid(),
  },
};


/**
 * Install message routes in the given router.
 *
 * @param {Router} app - The parent router.
 */
 module.exports = (app) => {
	const router = new Router({
		prefix: '/messages',
	});

  router.get('/:groupId',requireAuthentication, validate(getAllGroupMessages.validationScheme), getAllGroupMessages);
  router.post('/',requireAuthentication, validate(createMessage.validationScheme), createMessage);
  router.put('/:id',requireAuthentication, validate(updateMessageById.validationScheme), updateMessageById);
  router.delete('/:id',requireAuthentication, validate(deleteMessageById.validationScheme), deleteMessageById);

  app
    .use(router.routes())
    .use(router.allowedMethods());
};