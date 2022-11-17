const { createOne,findOne,findAll,deleteOne,updateOne } = require('../service/comment.service');

const createCommentHandler = (req,res) => {
    const { gameId,content } = req.body,
        { _id,nickname,avatar } = res.locals.user;
    createOne({gameId,content,authorName: nickname,authorAvatar:avatar, userId: _id},(err,data) => {
        if(err) {
            return res.error('500001');
        }
        res.success(data)
    })
}

const updateCommentHandler = (req,res) => {
    const {_id,state} = req.body;
    updateOne({ _id },{state},(err,data) => {
        if(err) {
            return res.error('500002');
        }
        if(!data) {
            return res.error('500003');
        }
        res.success(data)
    })
}

const getUserCommentList = (req,res) => {
    const { _id } = res.locals.user;
    findAll({ userId: _id },(err,data) => {
        if(err) {
            return res.error('500004');
        }
        res.success(data)
    })
}

const initCommentList = (req,res) => {
    const { gameId } = req.body;
    findAll({gameId},(err,data) => {
        if(err) {
            return res.error('500004');
        }
        res.success(data)
    })
}

const deleteOneComment = (req,res) => {
    const { id } = req.body;
    deleteOne({_id: id},(err,data) => {
        if(err) {
            return res.error('500005');
        }
        res.success(data)
    })
}

const deleteAllComment = (req,res) => {
    const user = res.locals.user;
    findAll({userId: user._id,isDeleted: false},(err,data) => {
        if(err) {
            return res.error('500005');
        }
        Comments.forEach(Comment => {
            deleteOne({_id: Comment._id},(err,data) => {
                if(err) {
                    return res.error('500005');
                }
            })
            res.success({msg: '删除成功'})
        })
    })
}

module.exports = {
    initCommentList,
    updateCommentHandler,
    createCommentHandler,
    deleteOneComment,
    deleteAllComment,
    getUserCommentList
}