const { tables, getKnex } = require('../data/index');


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
 * @param {string} id - The id to search for.
 */
const findById = (id) => {
  return getKnex()(tables.user)
    .where('email', id)
    .first();
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
      .where('email', id);
    return rowsAffected > 0;
  } catch (error) {
    const logger = getChildLogger('users-repo');
    logger.error('Error in deleteById', {
      error,
    });
    throw error;
  }
};


/**
 * Update a user with the given `id`.
 *
 * @param {string} id - Id of the user to update.
 * @param {object} userName - User to save.
 * @param {string} user.userName - Name of the user.
 */
 const updateById = async (id, {
  userName
}) => {
  try {
    await getKnex()(tables.user)
      .update({
        userName,
      })
      .where('email', id);
    return await findById(id);
  } catch (error) {
    const logger = getChildLogger('users-repo');
    logger.error('Error in updateById', {
      error,
    });
    throw error;
  }
};

module.exports = {
	findAll,
	findById,
	deleteById,
  findCount,
  updateById
};
 