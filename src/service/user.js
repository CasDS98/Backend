const usersRepository = require('../repository/user');

const getAll = async (
	limit = 100,
	offset = 0,
) => {
	const data = await usersRepository.findAll({ limit, offset });
	return {
		data,
		limit,
		offset
	};
};

const getById = (email) => {  throw new Error("not implemented yet"); }

const create = ({username, email, password}) => {
	throw new Error("not implemented yet");
}
const updateById = (email, {username, password}) => {
	throw new Error("not implemented yet");
}
const deleteById = (email) => {
	throw new Error("not implemented yet");
}

module.exports = {
	getAll,
	getById,
	create,
	updateById,
	deleteById,
}
