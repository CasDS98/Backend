const Joi = require('joi'); 
const Router = require('@koa/router');
const groupService = require('../service/group');
const { requireAuthentication } = require('../core/auth');
const validate = require('./_validation');

const getAllGroups = async (ctx) => {
	ctx.body = await groupService.getAllGroups(ctx.params.userId);
};

getAllGroups.validationScheme = {
  params: {
    userId: Joi.string().uuid(),
  },
};

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

const deleteGroup = async (ctx) => {
	await groupService.deleteById(ctx.params.id);
	ctx.status = 204;
};

deleteGroup.validationScheme = {
	params: {
    id: Joi.string().uuid(),
  },
};

const getAllMembers = async (ctx) => {
	ctx.body = await groupService.getAllMembers(ctx.params.id);
};

getAllMembers.validationScheme = {
	params: {
    id: Joi.string().uuid(),
  },
};

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