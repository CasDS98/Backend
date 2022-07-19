const { getLogger } = require('../core/logging');
const usersRepository = require('../repository/user');

const debugLog = (message, meta) => {
	getLogger().debug(message,meta);
};

const getAll = async (
	limit = 100,
	offset = 0,
) => {
	debugLog('Fetching all users', {limit, offset})
	const data = await usersRepository.findAll({ limit, offset });
	const count = await usersRepository.findCount();
	return {
		data,
		count,
		limit,
		offset
	};
};

const getById = async (email) => {
	debugLog(`Fetching user with id ${email}`)
	const user = await usersRepository.findById(email);
	
	if(!user) {
		throw new Error(`No user with id ${email} exists`);
	}
	
	return user;
};

const register = ({username, email, password}) => {
	throw new Error("not implemented yet");
}
const updateById = (email, {username }) => {
	debugLog(`Updating user with id ${email}`, { username});
  return userRepository.updateById(email, { username});
}
const deleteById = async (email) => {
	debugLog(`Deleting user with id ${email}`)
	const deleted = await usersRepository.deleteById(email);
	
	if(!deleted) {
		throw new Error(`No user with id ${email} exists`);
	}
}

module.exports = {
	getAll,
	getById,
	register,
	updateById,
	deleteById,
}
