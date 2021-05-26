const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema(
  {
    user_id: String,
    result: String,
    create_at: Date,
    updated_at: Date,
    is_deleted: Boolean,
  },
  { versionKey: false }
);

const Histories = mongoose.model('Histories', tokenSchema, 'histories');

module.exports = {
  findByLambda: async function (lambda) {
    const _lambda = { ...lambda, is_deleted: false };
    return await Histories.find(_lambda);
  },
  createByLambda: async function (lambda) {
    return await Histories.insertMany(lambda);
  },
  updateByLambda: async function (id, lambda) {
    return await Histories.updateOne(id, lambda);
  },
  deleteByLambda: async function (lambda) {
    return await Histories.deleteOne(lambda);
  },
};
