const config = require('config');
const argon2 = require('argon2');

const ARGON_SALT_LENGHT = config.get('auth.argon.saltLenght');
const ARGON_HASH_LENGHT = config.get('auth.argon.hashLenght');
const ARGON_TIME_COST = config.get('auth.argon.timeCost');
const ARGON_MEMEORY_COST = config.get('auth.argon.memoryCost');


module.exports.hashPassword = async (password) => {
  const passwordHash = await argon2.hash(password,{
    saltLenght: ARGON_SALT_LENGHT,
    hashLenght: ARGON_HASH_LENGHT,
    timeCost: ARGON_TIME_COST,
    memoryCost: ARGON_MEMEORY_COST,
    type: argon2.argon2id,
  });
  
  return passwordHash;
}

module.exports.verifyPassword = async (password, passwordHash) => {
  const valid = await argon2.verify(passwordHash, password,{
    saltLenght: ARGON_SALT_LENGHT,
    hashLenght: ARGON_HASH_LENGHT,
    timeCost: ARGON_TIME_COST,
    memoryCost: ARGON_MEMEORY_COST,
    type: argon2.argon2id,
  });
  
  return valid;
}