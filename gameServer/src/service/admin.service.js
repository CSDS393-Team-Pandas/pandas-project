const AdminModel = require('../model/admin.model');

const createOne = (input, callback) => { //创建用户
  const ins = new AdminModel(input)
  ins.save(callback)
};

const findOne = (input, callback) => { //查找单个用户
    AdminModel.findOne(input, callback)
}

const updateOne = (query, input, callback) => {
    AdminModel.findOneAndUpdate(query, input, callback)
}

const findAll = () => {
    return AdminModel.find()
}

module.exports = {
    createOne,
    findOne,
    findAll,
    updateOne
};
