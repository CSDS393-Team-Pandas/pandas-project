const { createOne,findOne,findAll,deleteOne,updateOne } = require('../service/game.service');

const createGameHandler = (req,res) => {
    const { price,number,thumb,imgList,tag,name,description } = req.body,
        { _id,nickname } = res.locals.user;
    createOne({price,number,thumb,imgList,tag,name,description,adminId: _id,authorName: nickname},(err,data) => {
        if(err) {
            return res.error('500001');
        }
        res.success(data)
    })
}

const updateGameHandler = (req,res) => {
    const { thumb,description,name,price,number,tag,_id } = req.body;
    updateOne({ _id },{thumb,description,name,price,tag,number},(err,data) => {
        if(err) {
            return res.error('500002');
        }
        if(!data) {
            return res.error('500003');
        }
        res.success(data)
    })
}

const addGameRateHandler = (req,res) => {
    const { _id: userId } = res.locals.user;
    const { id,rate } = req.body;
    findOne({ _id: id},(err,data) => {
        if(err) {
            return res.error('500004');
        }
        const { score } = data;
        const index = score.findIndex(item => {
            if(item.userId == userId) {
                item = {
                    rate,
                    userId
                }
                return true
            }
            return false;
        })
        if(index == -1) {
            score.push({
                userId,
                rate
            })
        }
        updateOne({_id: id},{score},(err,data) => {
            if(err) {
                return res.error('500004');
            }
            res.success(data)
        })
    })

}

const getGameInfo = (req,res) => {
    const { id } = req.body;
    findOne({ _id: id},(err,data) => {
        if(err) {
            return res.error('500004');
        }
        res.success(data)
    })
}

const initCategoryGameList = (req,res) => {
    const { tag } = req.body;
    const query = tag == 'all'? {}: {tag};
    console.log('query',query)
    findAll(query,(err,data) => {
        if(err) {
            return res.error('500004');
        }
        res.success(data)
    })
}

const initAdminGameList = (req,res) => {
    const { _id } = res.locals.user;
    findAll({adminId: _id,isDeleted: false},(err,data) => {
        if(err) {
            return res.error('500004');
        }
        res.success(data)
    })
}

const initGameList = (req,res) => {
    findAll({isDeleted: false},(err,data) => {
        if(err) {
            return res.error('500004');
        }
        res.success(data)
    })
}

const deleteOneGame = (req,res) => {
    const { id } = req.body;
    deleteOne({_id: id},(err,data) => {
        if(err) {
            return res.error('500005');
        }
        res.success(data)
    })
}

const deleteAllGame = (req,res) => {
    const user = res.locals.user;
    findAll({userId: user._id,isDeleted: false},(err,data) => {
        if(err) {
            return res.error('500005');
        }
        Games.forEach(Game => {
            deleteOne({_id: Game._id},(err,data) => {
                if(err) {
                    return res.error('500005');
                }
            })
            res.success({msg: 'Delete successfully'})
        })
    })
}

module.exports = {
    initGameList,
    updateGameHandler,
    createGameHandler,
    deleteOneGame,
    deleteAllGame,
    initAdminGameList,
    getGameInfo,
    initCategoryGameList,
    addGameRateHandler
}