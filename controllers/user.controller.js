const User = require('../models/user.model');
const { catchAsync, ApiError } = require('../util');
const httpStatus = require('http-status');

exports.register = catchAsync(async (req, res) => {
	const foundUser = await User.findOne({ email: req.body.email });
	if (foundUser) {
		throw new ApiError(httpStatus.CONFLICT, 'Email already exists');
	}
	const user = new User(req.body);
	await user.save();
	res.status(httpStatus.CREATED).json(user.transform());
});

exports.login = catchAsync(async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findByCredentials(email, password);
	const token = await user.token();
	res.json({
		token,
		user: user.transform(),
	});
});

exports.listUser = catchAsync(async (req, res) => {
	const users = await User.find({});
	res.json({ users });
});
