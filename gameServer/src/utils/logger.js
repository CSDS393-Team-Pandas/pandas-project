/**
 * @author zzz2003
 * @description 将日志文件存储到服务器的log文件中
 */
 const log4js = require('log4js');
 const path = require('path');
 log4js.configure({
   appenders: {
     // 记录器1: 输出到控制台
     console: {
       type: 'console'
     },
     // 记录器2: 输出到access_http.log日志文件
     infoLog: {
       type: 'dateFile',
       filename: path.join(__dirname, '../logs/success.log'),
       pattern: 'yyyy-MM-dd',
       alwaysIncludePattern: true,
       keepFileExt: true
     },
     // 记录器3: 输出到aceess_error.log日志文件
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
 
 // 实例化普通日志logger
 const loggerhttp = log4js.getLogger('http');
 // 实例化error日志logger
 const loggererror = log4js.getLogger('error');
 
 // 封装普通日志和error日志两种logger
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
 