const Router = require('@koa/router');
const userService = require('../service/user');

const getAllUsers = async (ctx) => {
  const users = await userService.getAll(
    ctx.query.limit && Number(ctx.query.limit),
    ctx.query.offset && Number(ctx.query.offset),
  );
  ctx.body = users;
};

const getById = async (ctx) => {
  const user = await userService.getById(ctx.params.email);
  ctx.body = user;
}

const updateById = async (ctx) => {
  const user = await userService.updateById(ctx.params.email, ctx.request.body);
  ctx.body = user;
}

const deleteById = async (ctx) => {
  await userService.deleteById(ctx.params.email);
  ctx.status = 204;
}

/**
 * Install user routes in the given router.
 *
 * @param {Router} app - The parent router.
 */
module.exports = function installUsersRoutes(app) {
  const router = new Router({
    prefix: '/users',
  });

  router.get('/', getAllUsers);
  router.get('/:email', getById);
  router.put('/:email', updateById);
  router.delete('/:email', deleteById);
 
  app
    .use(router.routes())
    .use(router.allowedMethods());
};