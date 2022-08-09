//const config = require('config');
const { getChildLogger } = require('../core/logging');
const friendRepository = require('../repository/friend');


const debugLog = (message, meta = {}) => {
	if (!this.logger) this.logger = getChildLogger('friend-service');
	this.logger.debug(message, meta);
};

/**
 * Get all friends, from user with id : userId.
 *
 * @param {uuid} [userId] - id of user
 */
 const getAllFriends = async (
	userId
) => {
	debugLog('Fetching all friends from user wth id: ', { userId});
	const data = await friendRepository.findAllFriends(userId);
	const count = await friendRepository.findFriendsCount(userId);
	return {
		data,
		count,
	};
};

/**
 * Create a new friends
 *
 * @param {uuid} user_a - id user 1.
 * @param {uuid} user_b - id user 2.
 */
 const create = async ({ user_a, user_b}) => {
	debugLog('Creating new friends: ', { user_a, user_b});
	console.log(user_a);
	console.log(user_b);
	return friendRepository.create({
		user_a,
		user_b,
	});
};



/**
 * Delete friends by given user ids
 *
 * @param {uuid} user_a - id user 1.
 * @param {uuid} user_b - id user 2.
 */
 const deleteByUserIds = async ({ user_a, user_b}) => {
	debugLog(`Deleting friends with ids ${user_a} and ${user_b}`);
	await friendRepository.deleteByUserIds(user_a, user_b);
};

module.exports = {
	getAllFriends,
  create,
  deleteByUserIds
};