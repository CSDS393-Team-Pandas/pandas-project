const express = require("express")
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const connect = require('./utils/connect');
const logger = require('./utils/logger')
const config = require('config');
const router = require('./router/routes');
const adminRouter = require('./router/adminRoutes')
const path = require('path');
const { resultHandler,authCheck } = require('./middleware');

const middleWareInit = (app) => {
    app.use('/',express.static(path.join(__dirname,'../public/build')))
    app.use(cors());
    app.use(bodyParser.urlencoded({ extended:false ,limit: '400kb'}));
    app.use(bodyParser.json({limit: '400kb'}));
    app.use(helmet());
    app.use(resultHandler);
    app.use(authCheck);
    app.use('/api',router)
    app.use('/admin',adminRouter)
}

const main = () => {
    const app = express();
    middleWareInit(app);
    app.listen(config.get('port') || 3030, 
    async () => {
        await connect();
        logger.info(`Server running on ${config.get('baseUrl')}`)
    })
}

main();