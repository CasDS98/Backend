const Router = require('@koa/router');

const installUserRouter = require('./_user');


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

 app.use(router.routes()).use(router.allowedMethods());
};