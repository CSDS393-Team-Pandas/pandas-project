const mongoose = require('mongoose');
const config = require('config');
const logger = require('./logger');

/**
 * @description 连接mongodb数据库
 * */ 

const connect = async () => {
    try {   
        await mongoose.connect(config.get("mongo").url)
        logger.info('connect successfully')
    } catch(e) {
        logger.error('cannot connect to database',e)
    }
}

module.exports = connect