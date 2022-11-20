const AdminModel = require('../model/admin.model');

const createOne = (input, callback) => { //Create user
  const ins = new AdminModel(input)
  ins.save(callback)
};

const findOne = (input, callback) => { //Search for single user
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
