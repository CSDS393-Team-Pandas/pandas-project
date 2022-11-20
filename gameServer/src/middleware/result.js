const logger = require('../utils/logger');
const langs = {
  'en-us': require('../../i18n/en-US.json'),
  'zh-cn': require('../../i18n/zh-CN.json')
};
/**
 * Process response data
 */
module.exports = async (req, res, next) => {
  res.success = (data,status = 200) => {
    const body = { code: '200', data, message: 'Successful operation', success: true };
    res.body = body;
    res.status(status).json(body);
  };
  res.error = (err, status, data = {data: '', success: false}) => {
    const r = parseError(req, res, err, status, data);
    res.body = r.body;
    res.status(r.status).json(r.body);
  };
  next();
};

/**
 * @description Parse error messages
 * @param {object} ctx
 * @param {any} err Error message
 * @param {number} status customized status code
 * @param {object} data customized error message
 */
function parseError (req, res, err, status, data) {
  let lang = req.acceptsLanguages('en-US', 'zh-CN');
  lang = (lang && typeof lang !== 'undefined') ? (lang && lang.toLowerCase()) : 'en-US';
  lang = lang.indexOf(',') !== -1 ? lang.substr(0, 5) : lang;
  req.lang = lang;
  const i18n = langs[lang] ? langs[lang] : langs['en-US'];
  req.i18n = i18n;
  if (typeof err === 'string' && Number.isInteger(+err)) {
    const e = i18n[err];
    if (!e) {
      return {
        status: status || 400,
        body: Object.assign({ code: '400400', message: err }, data)
      };
    }
    return {
      status: status || e.status || 400,
      body: Object.assign({ code: err, message: e.message }, data)
    };
  } else if (typeof err === 'object') {
    if (typeof err.message === 'string' && Number.isInteger(+err.message)) {
      const e = i18n[err.message];
      if (e) {
        return {
          status: status || e.status || 400,
          body: Object.assign({ code: err.message, message: e.message }, data)
        };
      }22222
    } else if (typeof err.message === 'string' && err.message.indexOf('Error') > -1) {
      const e = i18n[err.message.slice(7)];
      if (e) {
        return {
          status: status || e.status || 400,
          body: Object.assign({ code: err.message.slice(7), message: e.message }, data)
        };
      }
    }
    handlerError(req, res, err);
    return {
      status: status || 500,
      body: Object.assign({ code: '400500', message: err.message }, data)
    };
  } else {
    handlerError(req, res, err);
    return {
      status: status || 500,
      body: Object.assign({ code: '400500', message: err.message }, data)
    };
  }
}

/**
 * @description Print error log
 * @param {object} ctx
 * @param {object} err Error message
 */

function handlerError (req, res, err) {
  const ip = req.ip;
  logger.error('Error Begin ====>');
  logger.error('Information request -- ip address：', ip, '---', req.method, req.originalUrl, '---', req.headers['user-agent'], '---- Token:>>>>>', req.headers['authorization']);
  logger.error('get request input>>>>>>:', req.query);
  logger.error('post request input>>>>>>:', req.body);
  logger.error('Error message', err);
  logger.error('<===== Error End');
}
