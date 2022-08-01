
const uuid = require('uuid');
const { tables, getKnex } = require('../data/index');
const { getChildLogger } = require('../core/logging');

/**
 * Find group with the given `id`.
 *
 * @param {uuid} id - Id of the group to find.
 */
 const findById = async (id) => {
  const group = await getKnex()(tables.group)
    .first()
    .where(`${tables.group}.id`, id);
  
  return group;
};

/**
 * Find userGroup with the given `id`.
 *
 * @param {uuid} id - Id of the userGroup to find.
 */
 const findUserGroupById = async (id) => {
  const userGroup = await getKnex()(tables.userGroup)
    .first()
    .where(`${tables.userGroup}.id`, id);
  
  return userGroup;
};

/**
 * Find userGroup with the given group and user id.
 *
 * @param {uuid} group_id - id of group
 * @param {uuid} user_id - id of user 
 */
 const findUserGroup = async (user_id, group_id) => {
  const userGroup = await getKnex()(tables.userGroup).first().where(`${tables.userGroup}.group`, group_id).where(`${tables.userGroup}.user`, user_id);
  return userGroup;
};



/**
 * Get all groups  
 *
 * @param {uuid} user_id id of user
 */
 const findAllGroups = async (
  user_id) => {

  const groups = await getKnex()(tables.userGroup).join(tables.group, `${tables.group}.id`,`${tables.userGroup}.group`)
  .select(`${tables.group}.id`,`${tables.group}.name`).where(`${tables.userGroup}.user` , user_id);

  return groups;
};



/**
 * Create a new group
 *
 * @param {string} name - id user 1.
 */
 
 const create = async (name) => {
  try {
    const id = uuid.v4();
    await getKnex()(tables.group)
      .insert({
        id,
        name
      });
    return await findById(id);
  } catch (error) {
    const logger = getChildLogger('group-repo');
    logger.error('Error in create', {
      error,
    });
    throw error;
  }
};

/**
 * Delete a group with the id.
 *
 * @param {uuid} id - id of group
 *
 * @returns {Promise<boolean>} Whether the group was deleted.
 */
 const deleteById = async (id) => {
  try {
    const rowsAffected = await getKnex()(tables.group)
      .delete()
      .where(`${tables.group}.id`, id);
    return rowsAffected > 0;
  } catch (error) {
    const logger = getChildLogger('group-repo');
    logger.error('Error in deleteById', {
      error,
    });
    throw error;
  }
};


/**
 * Get all group members
 *
 * @param {uuid} id - id of group
 */
 const findAllMembers = async (
  id) => {

  const members = await getKnex()(tables.userGroup).join(tables.user, `${tables.user}.id`,`${tables.userGroup}.user`)
  .select(`${tables.user}.id`,`${tables.user}.email`, `${tables.user}.user_name`).where(`${tables.userGroup}.group` , id);
  console.log(members);
  return members;
};


/**
 * Add a member to a group
 *
 * @param {uuid} group_id - id of group
 * @param {uuid} user_id - id of user to add
 */
 
 const addMember = async (group_id, user_id) => {
  try {
    const id = uuid.v4();
    await getKnex()(tables.userGroup)
      .insert({
        id,
        user : user_id,
        group : group_id
      });
    return await findUserGroupById(id);
  } catch (error) {
    const logger = getChildLogger('group-repo');
    logger.error('Error in add member', {
      error,
    });
    throw error;
  }
};

/**
 * Delete a member from a group
 *
 * @param {uuid} id - id of group
 * @param {uuid} user_id - id of user to remove
 *
 * @returns {Promise<boolean>} Whether the member was deleted.
 */
 const deleteMember = async (id,user_id) => {
  try {
    const rowsAffected = await getKnex()(tables.userGroup)
      .delete()
      .where(`${tables.userGroup}.user`, user_id)
      .where(`${tables.userGroup}.group`, id)
      
    return rowsAffected > 0;
  } catch (error) {
    const logger = getChildLogger('group-repo');
    logger.error('Error in delete member', {
      error,
    });
    throw error;
  }
};


module.exports = {
  create,
  findAllGroups,
  deleteById,
  findAllMembers,
	addMember,
	deleteMember,
  findUserGroup
};