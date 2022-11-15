const AdminModel = require('../model/admin.model');

const createOne = (input, callback) => { //create user 
  const ins = new AdminModel(input)
  ins.save(callback)
};

const findOne = (input, callback) => { //look up user
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
