'use strict';
const crypto = require('crypto');
const config = require('config');
const moment = require('moment');

/**
 * @description randomly generate verify code
 * @author yxz
 * @param {number} length 
 * @returns {number}
 */
exports.generationCode = length => {
  return Math.random().toString().slice(length * -1);
};

/**
 * @description 
 * @param {*} password 
 * @returns {string}
 */
exports.md5 = password => {
  const salt = config.get('salt');
  return crypto.createHash('md5').update(password + salt).digest('hex');
};

/**
 * @description 正
 * @author yxz
 * @param {string} phone 
 */
exports.verifyPhone = phone => {
  const regex = /^1[3-9]\d{9}$/;
  return regex.test(phone);
};

/**
 * @description 
 * @author yxz
 * @param {string} email 
 * @returns true/false
 */
exports.verifyMail = email => {
  const regex = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  return regex.test(email);
};

/**
 * @param {*} date 日期
 */
exports.verifyDate = date => {
  const regex = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/;  // eslint-disable-line
  return regex.test(date);
};

/**
 * @description 
 * @returns string
 */
exports.modelNumber = () => {
  return 'MN' + moment().format('YYYYMMDD') + Math.random().toString().slice(2, 7);
};
