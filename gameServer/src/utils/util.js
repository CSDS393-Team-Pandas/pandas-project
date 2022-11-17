'use strict';
const crypto = require('crypto');
const config = require('config');
const moment = require('moment');

/**
 * @description 生成随机长度验证码
 * @author zzz2003
 * @param {number} length 长度
 * @returns {number}
 */
exports.generationCode = length => {
  return Math.random().toString().slice(length * -1);
};

/**
 * @description 密码md5加密（添加盐值）
 * @param {*} password 密码
 * @returns {string}
 */
exports.md5 = password => {
  const salt = config.get('salt');
  return crypto.createHash('md5').update(password + salt).digest('hex');
};

/**
 * @description 正则验证手机号
 * @author zzz2003
 * @param {string} phone 手机号
 */
exports.verifyPhone = phone => {
  const regex = /^1[3-9]\d{9}$/;
  return regex.test(phone);
};

/**
 * @description 正则验证邮箱
 * @author zzz2003
 * @param {string} email 邮箱
 * @returns true/false
 */
exports.verifyMail = email => {
  const regex = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  return regex.test(email);
};

/**
 * 校验日期格式是否符合YYYY-MM-DD格式
 * @param {*} date 日期
 */
exports.verifyDate = date => {
  const regex = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/;  // eslint-disable-line
  return regex.test(date);
};

/**
 * @description 生产模型编码
 * @returns string
 */
exports.modelNumber = () => {
  return 'MN' + moment().format('YYYYMMDD') + Math.random().toString().slice(2, 7);
};
