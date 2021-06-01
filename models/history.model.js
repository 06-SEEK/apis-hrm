const mongoose = require('mongoose');

const historySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    result: {
      type: Number,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const History = mongoose.model('History', historySchema, 'histories');

module.exports = History;
