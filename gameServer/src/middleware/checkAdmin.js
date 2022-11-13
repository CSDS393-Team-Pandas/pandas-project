const adminWhiteList = require('config').get('adminWhiteList')
const checkAdmin = (req,res,next) => {
    if(adminWhiteList.indexOf(req.originalUrl) > -1 || req.originalUrl.indexOf("preview") >= 0) {
        next();
    } else {
        const { isAuth } = res.locals.user;
        if(isAuth) {
            next()
        } else 
            res.error('400402')
    }
}

module.exports = checkAdmin;