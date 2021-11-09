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

module.exports = {
	findAll,
};
 