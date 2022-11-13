const RateModel = require('../model/rate.model');

const createOne = (input, callback) => {
  const ins = new RateModel(input)
  ins.save(callback)
};

const findOne = (input, callback) => { 
    RateModel.findOne(input, callback)
}

const updateOne = (query, input, callback) => {
    RateModel.findOneAndUpdate(query, input, callback)
}

const deleteOne = (query,callback) => {
    RateModel.findOneAndUpdate(query, {isDeleted: true}, callback)
}

const findAll = (query,callback) => {
    return RateModel.find(query,callback)
}

module.exports = {
    createOne,
    findOne,
    deleteOne,
    findAll,
    updateOne
};
