const { verifyJwt } = require('../utils/jwt');
const whiteList = require('config').get('whiteList')

const authCheck = async (req,res,next) => {
    if(whiteList.indexOf(req.originalUrl) > -1 || req.originalUrl.indexOf("preview") >= 0 
    || req.originalUrl.indexOf("video") >= 0) {
        next();
    } else {
        const token = req.headers.token; 
        if(!token) {
            return res.error('402001')
        }
        try {
            const user = await verifyJwt(token); //signJwt () token { valid,expres,decoded }
            if(user.valid) {
                res.locals.user = user.decoded;
                next();
            } else {
                res.error('402001')
            }
        } catch(e) {
            res.error('402020')
        }
    }
}

module.exports = authCheck