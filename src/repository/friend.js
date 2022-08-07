
const uuid = require('uuid');
const { tables, getKnex } = require('../data/index');
const { getChildLogger } = require('../core/logging');

const formatFriends = async (userId, friends) => {
  let formattedFriends = [];
  formattedFriends.push
  console.log(userId);
  friends.forEach( (f) => {
    let friendId;

    if(f.user_a === userId) friendId = f.user_b
    else  friendId = f.user_a;

    formattedFriends.push(
      friendId
    );}
  )

  return await getKnex()(tables.user).select("id","email","user_name","roles").havingIn(`${tables.user}.id`, formattedFriends);
}
   

/**
 * Find friends with the given `id`.
 *
 * @param {uuid} id - Id of the friends to find.
 */
 const findById = async (id) => {
  const friends = await getKnex()(tables.friend)
    .first()
    .where(`${tables.friend}.id`, id);
  
  return friends;
};

/**
 * Find friends count
 *
 * @param {uuid} userId id of user
 */
 const findFriendsCount = async (userId) => {
  const [count] = await getKnex()(tables.friend).select().where(`${tables.friend}.user_a`, userId).orWhere(`${tables.friend}.user_b`, userId)
    .count();

  return count['count(*)'];
};


/**
 * Get all friends 
 *
 * @param {uuid} userId id of user
 */
 const findAllFriends = async (
  userId) => {
  const friends = await getKnex()(tables.friend).select().where(`${tables.friend}.user_a`, userId).orWhere(`${tables.friend}.user_b`, userId);
  const result = await formatFriends(userId,friends);
  return result;
};



/**
 * Create a new friends
 *
 * @param {uuid} user_a - id user 1.
 * @param {uuid} user_b - id user 2.
 */
 
 const create = async ({
  user_a,
  user_b
}) => {
  try {
    //check if friends already exist
    const friend = await getKnex()(tables.friend).first().havingIn(`${tables.friend}.user_a`, [user_a , user_b]).havingIn(`${tables.friend}.user_b`, [user_a , user_b])
   
    if(friend)
    {
      const logger = getChildLogger('friends-repo');
      logger.error(`Error in create : users ${user_a} and ${user_b} are friends already`, 
      );
      throw error;
    }

    const id = uuid.v4();
    await getKnex()(tables.friend)
      .insert({
        id,
        user_a,
        user_b
      });
    return await findById(id);
  } catch (error) {
    const logger = getChildLogger('friends-repo');
    logger.error('Error in create', {
      error,
    });
    throw error;
  }
};

/**
 * Delete a friends with the given user ids.
 *
 * @param {uuid} user_a - id user 1.
 * @param {uuid} user_b - id user 2.
 *
 * @returns {Promise<boolean>} Whether the Friends was deleted.
 */
 const deleteByUserIds = async (user_a, user_b) => {
  try {
    const rowsAffected = await getKnex()(tables.friend)
      .delete()
      .whereIn(`${tables.friend}.user_a`, [user_a , user_b]).whereIn(`${tables.friend}.user_b`, [user_a , user_b]);
    return rowsAffected > 0;
  } catch (error) {
    const logger = getChildLogger('friends-repo');
    logger.error('Error in deleteById', {
      error,
    });
    throw error;
  }
}; 


module.exports = {
  create,
  findAllFriends,
  findFriendsCount,
  deleteByUserIds
};