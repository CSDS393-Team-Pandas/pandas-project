const UserModel = require('../model/user.model');

const createOne = (input, callback) => { //Create User
  const ins = new UserModel(input)
  ins.save(callback)
};

const findOne = (input, callback) => { //Search for single user
    UserModel.findOne(input, callback)
}

const updateOne = (query, input, callback) => {
    UserModel.findOneAndUpdate(query, input, callback)
}

const deleteOne = (query, callback) => {
    UserModel.deleteOne(query, callback)
}

const findAll = (query,callback) => {
    return UserModel.find(query,callback)
}

module.exports = {
    createOne,
    deleteOne,
    findOne,
    findAll,
    updateOne
};
