const uuid = require('uuid');
const { tables, getKnex } = require('../data');
const { getChildLogger } = require('../core/logging');

/**
 * Get all `limit` users, skip the first `offset`.
 *
 * @param {object} pagination - Pagination options
 * @param {number} pagination.limit - Nr of transactions to return.
 * @param {number} pagination.offset - Nr of transactions to skip.
 */
const findAll = ({
  limit,
  offset,
}) => {
  return getKnex()(tables.user)
    .select()
    .limit(limit)
    .offset(offset)
    .orderBy('user_name', 'ASC');
};

/**
 * Calculate the total number of user.
 */
const findCount = async () => {
  const [count] = await getKnex()(tables.user)
    .count();
  return count['count(*)'];
};

/**
 * Find a user with the given id.
 *
 * @param {uuid} id - The id to search for.
 */
const findById = (id) => {
  return getKnex()(tables.user)
    .where('id', id)
    .first();
};

/**
 * Create a new user with the given `name`.
 *
 * @param {object} user - User to create.
 * @param {string} email - email of the user.
 * @param {string} user_name - Name of the user.
 * @param {string} passwordHash - Hashed password of the user.
 */
const create = async ({
  			email,
				user_name,
				passwordHash,
        roles
}) => {
  try {
    const id = uuid.v4();
    await getKnex()(tables.user)
      .insert({
        id,
				email,
				user_name,
				password : passwordHash,
        roles: JSON.stringify(roles),
      });
    return await findById(id);
  } catch (error) {
    const logger = getChildLogger('users-repo');
    logger.error('Error in create', {
      error,
    });
    throw error;
  }
};

/**
 * Update a user with the given `id`.
 *
 * @param {object} user - User to create.
 * @param {string} email - email of the user.
 * @param {string} user_name - Name of the user.
 * @param {string} password - password of the user.
 */
const updateById = async (id, {
  email,
  user_name,
}) => {
  try {
    await getKnex()(tables.user)
      .update({
        id,
				email,
				user_name,
      })
      .where('id', id);
    return await findById(id);
  } catch (error) {
    const logger = getChildLogger('users-repo');
    logger.error('Error in updateById', {
      error,
    });
    throw error;
  }
};

/**
 * delete a user with the given `id`.
 *
 * @param {string} id - Id of the user to delete.
 */
const deleteById = async (id) => {
  try {
    const rowsAffected = await getKnex()(tables.user)
      .delete()
      .where('id', id);
    return rowsAffected > 0;
  } catch (error) {
    const logger = getChildLogger('users-repo');
    logger.error('Error in deleteById', {
      error,
    });
    throw error;
  }
};

const findByEmail = (email) => {
	return getKnex()(tables.user)
		.where('email', email)
		.first();
};

const findBySearch = (value) => {
	return getKnex()(tables.user).select("id","email","user_name","roles")
    .limit(100)
		.where('user_name', 'like' , `%${value}%`)
    .orWhere('email', 'like' , `%${value}%`)
};

module.exports = {
  findAll,
  findCount,
  findById,
  create,
  updateById,
  deleteById,
  findByEmail,
  findBySearch
};