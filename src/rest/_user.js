const Joi = require('joi');
const Router = require('@koa/router');
const userService = require('../service/user');
const { requireAuthentication, makeRequireRole } = require('../core/auth');
const Role = require('../core/roles');
const validate = require('./_validation');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Represents the users of the application
 */


/**
 * @swagger
 * /api/users:
 *   get:
 *       summary: Get all users
 *       description: Get all users
 *       tags:
 *       - Users
 *      
 *       responses:
 *        200:
 *         description: Array of users
 *   
 
 */

const getAllUsers = async (ctx) => {
  const users = await userService.getAll(
    ctx.query.limit && Number(ctx.query.limit),
    ctx.query.offset && Number(ctx.query.offset),
  );
  ctx.body = users;
};
getAllUsers.validationScheme = {
  query: Joi.object({
    limit: Joi.number().integer().positive().max(1000).optional(),
    offset: Joi.number().integer().min(0).optional(),
  }).and('limit', 'offset'),
};


/**
 * @swagger
 * /api/users/:value:
 *   get:
 *       summary: Get all users with search 
 *       description: Get all users that have a name or email like the search value
 *       tags:
 *       - Users
 *       parameters:
 *       - in: path
 *         name: value
 *         schema:
 *          type: string
 *          required: true
 *          description: value used to search for users
 *       responses:
 *        200:
 *         description: Array of users
 *   
 
 */
const getUsersBySearch = async (ctx) => { 
  const users = await userService.getBySearch(ctx.params.value);
  ctx.body = users;
};

getUsersBySearch.validationScheme = {
  params: {
    value: Joi.string(),
  },
};

/**
 * @swagger
 * /api/users/:id:
 *   get:
 *       summary: Get user by id
 *       description: Get a user by an id
 *       tags:
 *       - Users
 *       parameters:
 *       - in: path
 *         name: id
 *         schema:
 *          type: uuid
 *          required: true
 *          description: The id of the user
 *       responses:
 *        200:
 *         description: a user
 *   
 
 */
const getUserById = async (ctx) => {
  const user = await userService.getById(ctx.params.id);
  ctx.body = user;
};

getUserById.validationScheme = {
  params: {
    id: Joi.string().uuid(),
  },
};


const updateUserById = async (ctx) => {
  const user = await userService.updateById(ctx.params.id, ctx.request.body);
  ctx.body = user;
};

updateUserById.validationScheme = {
  params: {
    id: Joi.string().uuid(),
  },
  body: {
    user_name: Joi.string().max(255),
    email: Joi.string().email(),
  },
};

/**
 * @swagger
 * /api/users/:id:
 *   delete:
 *       summary: delete user
 *       description: delete a user by it's id
 *       tags:
 *       - Users
 *       parameters:
 *       - in: path
 *         name: id
 *         schema:
 *          type: uuid
 *          required: true
 *          description: ID of the user 
 * 
 *       responses:
 *        204:
 *         description: The user was succesfully deleted
 *   
 y
 */
const deleteUserById = async (ctx) => {
  await userService.deleteById(ctx.params.id);
  ctx.status = 204;
};

deleteUserById.validationScheme = {
  params: {
    id: Joi.string().uuid(),
  },
};

/**
 * @swagger
 * /api/users/register:
 *   post:
 *       summary: Register a user
 *       description: Creation of a new user
 *       tags:
 *       - Users
 * 
 *       requestBodies:
 *        description: The user info
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                user_name:
 *                  type: string
 *                paswword:
 *                  type: string
 *                email:
 *                  type: string
 *       responses:
 *        200:
 *         description: The session
 *   
 
 */
const login = async (ctx) => {
	const { email, password } = ctx.request.body;
  console.log("login")
	const session = await userService.login(email, password);
	ctx.body = session;
};

login.validationScheme = {
  body: {
    email: Joi.string().email(),
    password: Joi.string(),
  },
};


/**
 * @swagger
 * /api/users/login:
 *   post:
 *       summary: log in
 *       description: log in as a user
 *       tags:
 *       - Users
 * 
 *       requestBodies:
 *        description: The email and password
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                user_name:
 *                  type: string
 *                paswword:
 *                  type: string
 *       responses:
 *        200:
 *         description: The session
 *   
 
 */
const register = async (ctx) => {
	const session = await userService.register(ctx.request.body);
	ctx.body = session;
};

register.validationScheme = {
  body: {
    user_name: Joi.string().max(255),
    email: Joi.string().email(),
    password: Joi.string().min(8).max(255),
  },
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

  // Public routes
  router.post('/login', validate(login.validationScheme), login);
  router.post('/register',validate(register.validationScheme), register);

  const requireAdmin = makeRequireRole(Role.ADMIN);

  // Routes with authentication/autorisation
  router.get('/',requireAuthentication, validate(getAllUsers.validationScheme),  getAllUsers);
  router.get('/search/:value',requireAuthentication, validate(getUsersBySearch.validationScheme) ,  getUsersBySearch);
  router.get('/:id',requireAuthentication, validate(getUserById.validationScheme) ,  getUserById);
  router.put('/:id',requireAuthentication, validate(updateUserById.validationScheme) , updateUserById);
  router.delete('/:id',requireAuthentication, validate(deleteUserById.validationScheme) ,requireAdmin, deleteUserById);
  


  app
    .use(router.routes())
    .use(router.allowedMethods());
};