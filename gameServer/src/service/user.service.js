const UserModel = require('../model/user.model');

const createOne = (input, callback) => { //创建用户
  const ins = new UserModel(input)
  ins.save(callback)
};

const findOne = (input, callback) => { //查找单个用户
    UserModel.findOne(input, callback)
}

const updateOne = (query, input, callback) => {
    UserModel.findOneAndUpdate(query, input, callback)
}


const findAll = (query,callback) => {
    return UserModel.find(query,callback)
}

module.exports = {
    createOne,
    findOne,
    findAll,
    updateOne
};
