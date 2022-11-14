const { createOne,findOne,findAll,deleteOne,updateOne } = require('../service/rate.service');

// Create New Score
const createRateHandler = (req,res) => {
    const { gameId,rate } = req.body,
        { _id } = res.locals.user;
    findOne({userId: _id,gameId},(err,data) => {
        if(err) {
            return res.error('500001');
        }
        if(!data) {
            createOne({gameId,rate,userId: _id},(err,data) => {
                if(err) {
                    return res.error('500001');
                }
                res.success(data)
            })
        } else {
            updateOne({ _id: data._id },{rate},(err,data) => {
                if(err) {
                    return res.error('500002');
                }
                if(!data) {
                    return res.error('500003');
                }
                res.success(data)
            })
        }
    })
}

// Update score
const updateRateHandler = (req,res) => {
    const {_id,rate} = req.body;
    updateOne({ _id },{rate},(err,data) => {
        if(err) {
            return res.error('500002');
        }
        if(!data) {
            return res.error('500003');
        }
        res.success(data)
    })
}

const getUserRateList = (req,res) => {
    const { _id } = res.locals.user;
    findAll({ userId: _id },(err,data) => {
        if(err) {
            return res.error('500004');
        }
        res.success(data)
    })
}

//Initialize the game score
const initRateList = (req,res) => {
    const { gameId } = req.body;
    findAll({gameId},(err,data) => {
        if(err) {
            return res.error('500004');
        }
        res.success(data)
    })
}

// Delete socre
const deleteOneRate = (req,res) => {
    const { id } = req.body;
    deleteOne({_id: id},(err,data) => {
        if(err) {
            return res.error('500005');
        }
        res.success(data)
    })
}

const deleteAllRate = (req,res) => {
    const user = res.locals.user;
    findAll({userId: user._id,isDeleted: false},(err,data) => {
        if(err) {
            return res.error('500005');
        }
        Rates.forEach(Rate => {
            deleteOne({_id: Rate._id},(err,data) => {
                if(err) {
                    return res.error('500005');
                }
            })
            res.success({msg: 'Detele successfully'})
        })
    })
}

module.exports = {
    initRateList,
    updateRateHandler,
    createRateHandler,
    deleteOneRate,
    deleteAllRate,
    getUserRateList
}