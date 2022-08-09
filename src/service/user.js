const { getChildLogger } = require('../core/logging');
const userRepository = require('../repository/user');
const { verifyPassword, hashPassword } = require('../core/password');
const Role = require('../core/roles');
const { generateJWT, verifyJWT } = require('../core/jwt');
const ServiceError = require('../core/serviceError');

const checkAndParseSession = async (authHeader) => {
	if (!authHeader) {
		throw new ServiceError.unauthorized('You need to be signed in');
	}

	if (!authHeader.startsWith('Bearer ')) {
		throw new ServiceError.unauthorized('Invalid authentication token');
	}

	const authToken = authHeader.substr(7);
	try {
		const {
			roles, userId,
		} = await verifyJWT(authToken);

		return {
			userId,
			roles,
			authToken,
		};
	} catch (error) {
		const logger = getChildLogger('user-service');
		logger.error(error.message, { error });
		throw new ServiceError.unauthorized(error.message);
	}
};

const checkRole = (role, roles) => {
	const hasPermission = roles.includes(role);

	if (!hasPermission) {
		throw new ServiceError.unauthorized('You are not allowed to view this part of the application');
	}
};

const debugLog = (message, meta = {}) => {
	if (!this.logger) this.logger = getChildLogger('user-service');
	this.logger.debug(message, meta);
};

/**
 * Register a new user
 *
 * @param {object} user - User to create.
 * @param {string} email - email of the user.
 * @param {string} user_name - Name of the user.
 * @param {string} password - password of the user.
 */
 const register = async ({
	user_name,
	email,
	password,
}) => {
	const passwordHash = await hashPassword(password);

	const user = await userRepository.create({
		user_name,
		email,
		passwordHash,
		roles: [Role.USER],
	});

	return await makeLoginData(user);
};


/**
 * Get all `limit` users, skip the first `offset`.
 *
 * @param {number} [limit] - Nr of users to fetch.
 * @param {number} [offset] - Nr of users to skip.
 */
 const getAll = async (
  limit = 100,
  offset = 0,
) => {
  debugLog('Fetching all users', { limit, offset });
  const data = await userRepository.findAll({ limit, offset });
  const totalCount = await userRepository.findCount();
  return {
    data,
    count: totalCount,
    limit,
    offset,
  };
};

/**
 * Get the user with the given id.
 *
 * @param {string} id - Id of the user to get.
 *
 * @throws {ServiceError} One of:
 * - NOT_FOUND: No user with the given id could be found.
 */
const getById = async (id) => {
  debugLog(`Fetching user with id ${id}`);
  const user = await userRepository.findById(id);

  if (!user) {
    throw new ServiceError.notFound(`No user with id ${id} exists`, { id });
  }

  return user;
};


/**
 * Get the user by search value.
 *
 * @param {string} value - value to search by.
 *
 */
 const getBySearch = async (value) => {
  debugLog(`Fetching user with name or email like ${value}`);
  const user = await userRepository.findBySearch(value);

  return user;
};

/**
 * Update an existing user.
 *
 * @param {object} user - User to create.
 * @param {string} id - Id of the user to update.
 * @param {string} email - email of the user.
 * @param {string} user_name - Name of the user.
 *
 */
const updateById = (id, { email,	user_name}) => {
  debugLog(`Updating user with id ${id}`, {id,	email,	user_name});
  return userRepository.updateById(id, { email,	user_name });
};


/**
 * Delete an existing user.
 *
 * @param {string} id - Id of the user to delete.
 *
 * @throws {ServiceError} One of:
 * - NOT_FOUND: No user with the given id could be found.
 */
const deleteById = async (id) => {
  debugLog(`Deleting user with id ${id}`);
  const deleted = await userRepository.deleteById(id);

  if (!deleted) {
    throw ServiceError.unauthorized(`No user with id ${id} exists`, { id });
  }
};

const makeExposedUser = ({ id, user_name, email, roles }) => ({
	id,
	user_name,
	email,
	roles,
});

const makeLoginData = async (user) => {
	const token = await generateJWT(user);
	return {
		user: makeExposedUser(user),
		token,
	};
};

const login = async (email, password) => {
	const user = await userRepository.findByEmail(email);

	if (!user) {
		// DO NOT expose we don't know the user
		throw ServiceError.notFound('The given email and password do not match');
	}

	const passwordValid = await verifyPassword(password, user.password);

	if (!passwordValid) {
		// DO NOT expose we know the user but an invalid password was given
		throw new ServiceError.unauthorized('The given email and password do not match');
	}

	return await makeLoginData(user);
};


module.exports = {
  register,
  getAll,
  getById,
  updateById,
  deleteById,
  login,
  checkAndParseSession,
  checkRole,
	getBySearch
};