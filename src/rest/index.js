const Router = require('@koa/router');

const installUserRouter = require('./_user');
const installFriendRouter = require('./_friend');
const installMessageRouter = require('./_message');

/**
* Install all routes in the given Koa application.
*
* @param {Koa} app - The Koa application.
*/

module.exports = (app) => {
 const router = new Router({
   prefix: '/api',
 });

 installUserRouter(router);
 installFriendRouter(router);
 installMessageRouter(router);
 router.get('/', ctx => {ctx.body = '<h1>Chatapp api</h1>'});

 app.use(router.routes()).use(router.allowedMethods());
};