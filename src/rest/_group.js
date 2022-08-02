const Router = require('@koa/router');
const groupService = require('../service/group');
const { requireAuthentication } = require('../core/auth');

const getAllGroups = async (ctx) => {
	ctx.body = await groupService.getAllGroups(ctx.params.userId);
};

const createGroup = async (ctx) => {
	const newGroup = await groupService.create({
		...ctx.request.body,
	});
	ctx.body = newGroup;
	ctx.status=201;
};

const deleteGroup = async (ctx) => {
	await groupService.deleteById(ctx.params.id);
	ctx.status = 204;
};

const getAllMembers = async (ctx) => {
	ctx.body = await groupService.getAllMembers(ctx.params.id);
};

const addMember = async (ctx) => {
	await groupService.addMember(ctx.params.id,{
		...ctx.request.body,
	});
	ctx.status = 204;
};

const deleteMember = async (ctx) => {
	await groupService.deleteMember(ctx.params.id,{
		...ctx.request.body,
	});
	ctx.status = 204;
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

	router.get('/:userId',requireAuthentication, getAllGroups);
  router.get('/members/:id',requireAuthentication, getAllMembers);
	router.post('/',requireAuthentication, createGroup);
  router.delete('/:id',requireAuthentication, deleteGroup);
  router.post('/members/:id',requireAuthentication, addMember);
  router.delete('/members/:id',requireAuthentication, deleteMember);

	app.use(router.routes()).use(router.allowedMethods());
};