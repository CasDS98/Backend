const Router = require('@koa/router');
const userService = require('../service/user');

const getAllUsers = async (ctx) => {
  const users = await userService.getAll(
    ctx.query.limit && Number(ctx.query.limit),
    ctx.query.offset && Number(ctx.query.offset),
  );
  ctx.body = users;
};

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
 
  app
    .use(router.routes())
    .use(router.allowedMethods());
};