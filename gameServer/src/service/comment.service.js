const CommentModel = require('../model/comment.model');

const createOne = (input, callback) => { //Create user
  const ins = new CommentModel(input)
  ins.save(callback)
};

const findOne = (input, callback) => { //Search for single user
    CommentModel.findOne(input, callback)
}

const updateOne = (query, input, callback) => {
    CommentModel.findOneAndUpdate(query, input, callback)
}

const deleteOne = (query,callback) => {
    CommentModel.deleteOne(query, callback)
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
