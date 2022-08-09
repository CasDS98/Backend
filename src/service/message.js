const { getChildLogger } = require('../core/logging');
const messageRepository = require('../repository/message');
const userRepository = require('../repository/user');
const ServiceError = require('../core/serviceError');


const debugLog = (message, meta = {}) => {
	if (!this.logger) this.logger = getChildLogger('message-service');
	this.logger.debug(message, meta);
};

/**
 * create a new message TODO Check if user is in group
 *
 * @param {object} message - Message to create.
 * @param {uuid} user_id - email of the user.
 * @param {uuid} group_id - Name of the user.
 * @param {string} message - password of the user.
 */
const create = ({
  user_id,
  group_id,
  message
}) => {
  debugLog('Creating a new Message', {	user_id,	group_id,	message });

  return messageRepository.create({
		user_id,
		group_id,
		message,
  });
};


/**
 * Delete an existing meaage.
 *
 * @param {uuid} id - Id of the message to delete.
 *
 * @throws {ServiceError} One of:
 * - NOT_FOUND: No message with the given id could be found.
 */
 const deleteById = async (id) => {
  debugLog(`Deleting message with id ${id}`);
  const deleted = await messageRepository.deleteById(id);

  if (!deleted) {
    throw ServiceError.notFound(`No message with id ${id} exists`, { id });
  }
};

/**
 * Update an existing message.
 * @param {string} message - password of the user.
 *
 */
 const updateById = (id, { message }) => {
  debugLog(`Updating message with id ${id}`, {message });
  return messageRepository.updateById(id, { message });
};


/**
 * Get all `limit` messages, skip the first `offset`.
 *
 * @param {uuid} groupId - id of group where to get messages from.
 * @param {number} [limit] - Nr of users to fetch.
 * @param {number} [offset] - Nr of users to skip.
 */
 const getAllGroup = async (
  limit = 100,
  offset = 0,
  groupId
) => {
  debugLog(`Fetching all group messages from group ${groupId}`, { limit, offset });
  const data = await messageRepository.findAllGroup(groupId, { limit, offset });
  const totalCount = await messageRepository.findCountGroup(groupId);
  return {
    data,
    count: totalCount,
    limit,
    offset,
  };
};




module.exports = {
  getAllGroup,
  create,
  updateById,
  deleteById,
};