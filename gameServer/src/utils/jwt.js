const jwt = require('jsonwebtoken');
const config = require('config');
const logger = require('../utils/logger');

/**
 * @description 生成token
 * @param {Object} info 用户信息
 * @returns string
 */

const signJwt = async (info,opt = {}) => {
  const token = jwt.sign(
    info,
    config.get('jwt').secret,
    Object.assign({
      expiresIn: 3600 * 24 * 7  // 过期时间一周
    },opt)
  );
  return token;
};

/**
 * @description 解析token
 * @param {string} token token
 * @returns string
 */

const verifyJwt = async token => {
  try {
    const decoded = jwt.verify(token, config.get('jwt').secret);
    logger.info('token解析结果：', decoded);
    return {
        decoded,
        valid: true
    };
  } catch (err) {
    logger.error('token解析报错：', err);
    if (err.message === 'jwt expired') { //如果是token过期，提示用户重新登录
      throw new Error('402021');
    }
    throw new Error('402020');
  }
};

module.exports = {
    verifyJwt,
    signJwt
}
