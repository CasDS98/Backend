const uuid = require('uuid');
const { tables, getKnex } = require('../data');
const { getChildLogger } = require('../core/logging');
const dateFormatter = require('../core/date');

/**
 * Find a message with the given id.
 *
 * @param {uuid} id - The id to search for.
 */
 const findById = (id) => {
  return getKnex()(tables.message)
    .where('id', id)
    .first();
};

/**
 * create a new message TODO Check if user is in group
 *
 * @param {object} message - Message to create.
 * @param {uuid} user_id - email of the user.
 * @param {uuid} group_id - Name of the user.
 * @param {string} message - password of the user.
 */
 const create = async ({
  user_id,
  group_id,
  message,
}) => {
try {
const id = uuid.v4();
const date_time = dateFormatter.formatDate(new Date());
await getKnex()(tables.message)
.insert({
  id,
  date_time,
  user : user_id,
  group : group_id,
  value : message,
});
return await findById(id);
} catch (error) {
const logger = getChildLogger('message-repo');
logger.error('Error in create', {
error,
});
throw error;
}
};

/**
 * delete a message with the given `id`.
 *
 * @param {uuid} id - Id of the message to delete.
 */
 const deleteById = async (id) => {
  try {
    const rowsAffected = await getKnex()(tables.message)
      .delete()
      .where('id', id);
    return rowsAffected > 0;
  } catch (error) {
    const logger = getChildLogger('message-repo');
    logger.error('Error in deleteById', {
      error,
    });
    throw error;
  }
};

/**
 * Update a message with the given `id`.
 *
 * @param {string} message - password of the user.
 */
 const updateById = async (id, {
  message
}) => {
  try {
    await getKnex()(tables.message)
      .update({
        id,
				value : message
      })
      .where('id', id);
    return await findById(id);
  } catch (error) {
    const logger = getChildLogger('message-repo');
    logger.error('Error in updateById', {
      error,
    });
    throw error;
  }
};

/**
 * Find messages count from group
 *
 * @param {uuid} groupId id of group
 */
 const findCountGroup = async (groupId) => {
  const [count] = await getKnex()(tables.message).select().where('group', groupId).count();

  return count['count(*)'];
};

/**
 * Get all `limit` messages, skip the first `offset`.
 *
 * @param {object} pagination - Pagination options
 * @param {number} pagination.limit - Nr of messages to return.
 * @param {number} pagination.offset - Nr of messages to skip.
 * @param {uuid} groupId id of group
 */
 const findAllGroup = (groupId,{
  limit,
  offset,
}) => {
  return getKnex()(tables.message)
    .select()
    .where('group', groupId)
    .limit(limit)
    .offset(offset)
    .orderBy('date_time', 'ASC');
};


module.exports = {
  create,
  deleteById,
  updateById,
  findAllGroup,
  findCountGroup
};