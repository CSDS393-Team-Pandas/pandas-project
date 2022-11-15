const jwt = require('jsonwebtoken');
const config = require('config');
const logger = require('../utils/logger');

/**
 * @description generate token
 * @param {Object} info user info
 * @returns string
 */

const signJwt = async (info,opt = {}) => {
  const token = jwt.sign(
    info,
    config.get('jwt').secret,
    Object.assign({
      expiresIn: 3600 * 24 * 7  // expire time is one week
    },opt)
  );
  return token;
};

/**
 * @description analysis token
 * @param {string} token token
 * @returns string
 */

const verifyJwt = async token => {
  try {
    const decoded = jwt.verify(token, config.get('jwt').secret);
    logger.info('token analysis result：', decoded);
    return {
        decoded,
        valid: true
    };
  } catch (err) {
    logger.error('token analysis report：', err);
    if (err.message === 'jwt expired') { 
      throw new Error('402021');
    }
    throw new Error('402020');
  }
};

module.exports = {
    verifyJwt,
    signJwt
}
