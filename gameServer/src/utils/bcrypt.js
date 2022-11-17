const bcrypt = require('bcrypt');
const config = require('config');

/**
 * @description 加密密码
 * @param {string} password
 * @return {string} hash
 * */ 

const verifyPassword = async (password) => {
    const salt = await bcrypt.genSalt(config.get('salt')) //使用bcrypt 模块进行数据加密
    return bcrypt.hashSync(password, salt);
}

module.exports = verifyPassword;