const bcrypt = require('bcrypt');
const config = require('config');

/**
 * @description Encrypt password
 * @param {string} password
 * @return {string} hash
 * */ 

const verifyPassword = async (password) => {
    const salt = await bcrypt.genSalt(config.get('salt')) //Data encryption using the bcrypt module
    return bcrypt.hashSync(password, salt);
}

module.exports = verifyPassword;