const Router = require('@koa/router');
const messageService = require('../service/message');


const createMessage = async (ctx) => {
	const message = await messageService.create({
		...ctx.request.body,
	});
	ctx.body = message;
	ctx.status=201;
};

const deleteMessageById = async (ctx) => {
  await messageService.deleteById(ctx.params.id);
  ctx.status = 204;
};

const updateMessageById = async (ctx) => {
  const message = await messageService.updateById(ctx.params.id, ctx.request.body);
  ctx.body = message;
};

const getAllGroupMessages = async (ctx) => {
  const message = await messageService.getAllGroup(
    ctx.query.limit && Number(ctx.query.limit),
    ctx.query.offset && Number(ctx.query.offset),
    ctx.params.groupId);
  ctx.body = message;
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

  router.get('/:groupId', getAllGroupMessages);
  router.post('/', createMessage);
  router.put('/:id', updateMessageById);
  router.delete('/:id', deleteMessageById);

  app
    .use(router.routes())
    .use(router.allowedMethods());
};