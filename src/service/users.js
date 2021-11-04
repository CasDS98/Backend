

let { USERS } = require('../data/mock-data');
const getAll = () => {
	return { data: USERS, count: USERS.length };
}	

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
