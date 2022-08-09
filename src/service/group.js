//const config = require('config');
const { getChildLogger } = require('../core/logging');
const groupRepository = require('../repository/group');
const ServiceError = require('../core/serviceError');


const debugLog = (message, meta = {}) => {
	if (!this.logger) this.logger = getChildLogger('groups-service');
	this.logger.debug(message, meta);
};

/**
 * Get all groups, from user with id : userId.
 *
 * @param {uuid} [userId] - id of user
 */
 const getAllGroups = async (
	userId
) => {
	debugLog('Fetching all groups from user wth id: ', { userId});
	const groups = await groupRepository.findAllGroups(userId);
	return groups;
};

/**
 * Create a new group
 *
 * @param {string} name - id user 1.
 */
 const create = async ({name}) => {
	debugLog('Creating new group: ', name);

	return groupRepository.create(name);
};



/**
 * Delete group by id
 *
 * @param {uuid} id - id of group
 */
 const deleteById = async (id) => {
	debugLog(`Deleting group with id ${id} `);
	await groupRepository.deleteById(id);
};


/**
 * Get all members of a group
 *
 * @param {uuid} id - id of group
 */
 const getAllMembers = async (id) => {
	debugLog(`Getting all members of group with id ${id} `);
	const members = await groupRepository.findAllMembers(id);
	return members;
};


/**
 * add a member to the group
 *
 * @param {uuid} id - id of group
 * @param {uuid} user_id - id of user to add
 */
 const addMember = async (id, {user_id}) => {
	debugLog(`Adding user with id ${user_id} to group with id ${id} `);

	//check if user already is a member of the group
	const result = await groupRepository.findUserGroup(user_id,id);
	if(result) throw ServiceError.forbidden(`User ${user_id} is already member of group ${id}`);
	//add member
	await groupRepository.addMember(id,user_id);
};


/**
 * delete a member from the group
 *
 * @param {uuid} id - id of group
 * @param {uuid} user_id - id of user to remove 
 */
 const deleteMember = async (id,{user_id}) => {
	debugLog(`Removing user with id ${user_id} from group with id ${id} `);
	await groupRepository.deleteMember(id,user_id);
};

module.exports = {
	getAllGroups,
  create,
  deleteById,
	getAllMembers,
	addMember,
	deleteMember
};