const Joi = require('joi'); 
const Router = require('@koa/router');
const messageService = require('../service/message');
const { requireAuthentication } = require('../core/auth');
const validate = require('./_validation');
const { unauthorized } = require('../core/serviceError');

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

const deleteMessageById = async (ctx) => {
  await messageService.deleteById(ctx.params.id);
  ctx.status = 204;
};

deleteMessageById.validationScheme = {
  params: {
    id: Joi.string().uuid(),
  },
};


const updateMessageById = async (ctx) => {
  const message = await messageService.updateById(ctx.params.id, ctx.request.body);
  ctx.body = message;
};

updateMessageById.validationScheme = {
  params: {
    id: Joi.string().uuid(),
  },
  body: {
    message: Joi.string().max(300)
  },
};


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

  router.get('/:groupId',requireAuthentication, validate(login.getAllGroupMessages), getAllGroupMessages);
  router.post('/',requireAuthentication, validate(login.createMessage), createMessage);
  router.put('/:id',requireAuthentication, validate(login.updateMessageById), updateMessageById);
  router.delete('/:id',requireAuthentication, validate(login.deleteMessageById), deleteMessageById);

  app
    .use(router.routes())
    .use(router.allowedMethods());
};