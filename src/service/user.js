const { getChildLogger } = require('../core/logging');
const userRepository = require('../repository/user');

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
const register = ({
  name,
}) => {
  debugLog('Creating a new user', {	email,	user_name,	password });
  return userRepository.create({
		email,
		user_name,
		password,
  });
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
    throw new Error(`No user with id ${id} exists`, { id });
  }

  return user;
};


/**
 * Update an existing user.
 *
 * @param {object} user - User to create.
 * @param {string} id - Id of the user to update.
 * @param {string} email - email of the user.
 * @param {string} user_name - Name of the user.
 * @param {string} password - password of the user.
 *
 * @throws {ServiceError} One of:
 * - NOT_FOUND: No user with the given id could be found.
 * - VALIDATION_FAILED: A user with the same email exists.
 */
const updateById = (id, { email,	user_name,	password }) => {
  debugLog(`Updating user with id ${id}`, {id,	email,	user_name,	password });
  return userRepository.updateById(id, { email,	user_name,	password });
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
    throw new Error(`No user with id ${id} exists`, { id });
  }
};

module.exports = {
  register,
  getAll,
  getById,
  updateById,
  deleteById,
};