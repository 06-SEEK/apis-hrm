const History = require('../models/history.model');
const { catchAsync } = require('../util');

const listHistory = catchAsync(async (req, res) => {
  const histories = await History.find({ user: req.user._id });
  res.json({ histories });
});

const postHistory = catchAsync(async (req, res) => {
  const history = new History({ user: req.user._id, result: req.body.result });
  await history.save();
  res.json({ history });
});

module.exports = {
  listHistory,
  postHistory,
};
