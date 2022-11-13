const CommentModel = require('../model/comment.model');

const createOne = (input, callback) => { //创建用户
  const ins = new CommentModel(input)
  ins.save(callback)
};

const findOne = (input, callback) => { //查找单个用户
    CommentModel.findOne(input, callback)
}

const updateOne = (query, input, callback) => {
    CommentModel.findOneAndUpdate(query, input, callback)
}

const deleteOne = (query,callback) => {
    CommentModel.findOneAndUpdate(query, {isDeleted: true}, callback)
}

const findAll = (query,callback) => {
    return CommentModel.find(query,callback)
}

module.exports = {
    createOne,
    findOne,
    deleteOne,
    findAll,
    updateOne
};
