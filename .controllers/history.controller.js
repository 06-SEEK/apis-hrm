const History = require('../models/history.model');
const { catchAsync } = require('../util');

exports.listHistory = catchAsync(async (req, res) => {
  const histories = await History.find({ user: req.user._id });
  res.json({ histories });
});

exports.postHistory = catchAsync(async (req, res) => {
  const history = new History({ user: req.user._id, result: req.body.result });
  await history.save();
  res.json({ history });
});
