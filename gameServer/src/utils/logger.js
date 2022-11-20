/**
 * @author 
 * @description 
 */
 const log4js = require('log4js');
 const path = require('path');
 log4js.configure({
   appenders: {
     // Logger 1: output to console
     console: {
       type: 'console'
     },
     // Logger 2: Output to access_http.log log file
     infoLog: {
       type: 'dateFile',
       filename: path.join(__dirname, '../logs/success.log'),
       pattern: 'yyyy-MM-dd',
       alwaysIncludePattern: true,
       keepFileExt: true
     },
     // Logger 3: Output to the aceess_error.log log file
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
 
 // Instantiate a normal log logger
 const loggerhttp = log4js.getLogger('http');
 // Instantiate the error log logger
 const loggererror = log4js.getLogger('error');
 
 // Encapsulates two loggers, normal log and error log
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
 