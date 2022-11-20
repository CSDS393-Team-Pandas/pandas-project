'use strict';
const crypto = require('crypto');
const config = require('config');
const moment = require('moment');

/**
 * @description Generate random length verification code
 * @author zzz2003
 * @param {number} length length
 * @returns {number}
 */
exports.generationCode = length => {
  return Math.random().toString().slice(length * -1);
};

/**
 * @description Password md5 encryption (add salt value)
 * @param {*} password password
 * @returns {string}
 */
exports.md5 = password => {
  const salt = config.get('salt');
  return crypto.createHash('md5').update(password + salt).digest('hex');
};

/**
 * @description Regular verification phone number
 * @author zzz2003
 * @param {string} phone phone number
 */
exports.verifyPhone = phone => {
  const regex = /^1[3-9]\d{9}$/;
  return regex.test(phone);
};

/**
 * @description Regular verification email
 * @author zzz2003
 * @param {string} email email
 * @returns true/false
 */
exports.verifyMail = email => {
  const regex = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  return regex.test(email);
};

/**
 * Check whether the date format conforms to the YYYY-MM-DD format
 * @param {*} date date
 */
exports.verifyDate = date => {
  const regex = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/;  // eslint-disable-line
  return regex.test(date);
};

/**
 * @description Produce model number
 * @returns string
 */
exports.modelNumber = () => {
  return 'MN' + moment().format('YYYYMMDD') + Math.random().toString().slice(2, 7);
};
