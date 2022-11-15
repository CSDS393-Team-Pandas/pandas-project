/**
 * @author yxz
 * @description 
 */
 const log4js = require('log4js');
 const path = require('path');
 log4js.configure({
   appenders: {
     console: {
       type: 'console'
     },
     infoLog: {
       type: 'dateFile',
       filename: path.join(__dirname, '../logs/success.log'),
       pattern: 'yyyy-MM-dd',
       alwaysIncludePattern: true,
       keepFileExt: true
     },
     errorLog: {
       type: 'dateFile',
       filename: path.join(__dirname, '../logs/error.log'),
       pattern: 'yyyy-MM-dd',
       alwaysIncludePattern: true,
       keepFileExt: true
     }
   },
   categories: {
     default: {
       appenders: ['infoLog', 'console'],
       level: 'debug'
     },
     error: {
       appenders: ['errorLog', 'console'],
       level: 'error'
     }
   }
 });
 
 const loggerhttp = log4js.getLogger('http');
 const loggererror = log4js.getLogger('error');
 
 const logger = {
   debug: function () {
     loggerhttp.debug(...arguments);
   },
   info: function () {
     loggerhttp.info(...arguments);
   },
   warn: function () {
     loggerhttp.warn(...arguments);
   },
   error: function () {
     loggererror.error(...arguments);
   }
 };
 
 module.exports = logger;
 