const jwt = require('jsonwebtoken');
const config = require('config');
const logger = require('../utils/logger');

/**
 * @description Generate token
 * @param {Object} info User information
 * @returns string
 */

const signJwt = async (info,opt = {}) => {
  const token = jwt.sign(
    info,
    config.get('jwt').secret,
    Object.assign({
      expiresIn: 3600 * 24 * 7  // Expires one week
    },opt)
  );
  return token;
};

/**
 * @description Parse token
 * @param {string} token token
 * @returns string
 */

const verifyJwt = async token => {
  try {
    const decoded = jwt.verify(token, config.get('jwt').secret);
    logger.info('token parsing result：', decoded);
    return {
        decoded,
        valid: true
    };
  } catch (err) {
    logger.error('token parsing error：', err);
    if (err.message === 'jwt expired') { //If the token expires, prompt the user to log in again
      throw new Error('402021');
    }
    throw new Error('402020');
  }
};

module.exports = {
    verifyJwt,
    signJwt
}
