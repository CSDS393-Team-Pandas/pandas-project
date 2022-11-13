const bcrypt = require('bcrypt');
const config = require('config');

/**
 * @description password
 * @param {string} password
 * @return {string} hash
 * */ 

const verifyPassword = async (password) => {
    const salt = await bcrypt.genSalt(config.get('salt')) //using bcrypt 模块进行数据加密
    return bcrypt.hashSync(password, salt);
}

module.exports = verifyPassword;