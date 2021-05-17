const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { ApiError } = require('../util');
const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');
const config = require('../config');


let userSchema = new mongoose.Schema(
	{
		phone: String,
		name: String,
    email: {
      type: String,
      required: [true, 'Please enter an email'],
      unique: true,
      lowercase: true
    },
		password: {
      type: String,
      required: [true, 'Please enter a password'],
    },
		avatar: String,
	},
	{ versionKey: false, timestamps: true }
);

userSchema.pre('save', async function (next) {
	const user = this;
	if (user.isModified('password')) {
		user.password = await bcrypt.hash(user.password, 10);
	}
  next();
});

userSchema.method({
  transform() {
    const transformed = {};
    const fields = ['phone', 'name', 'email', 'avatar'];
    fields.forEach(field => transformed[field] = this[field]);
    return transformed;
  },
  token() {
    const token = jwt.sign({ sub: this._id }, config.secret_key);
    return token;
  }
})


userSchema.statics.findByCredentials = async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid login credentials');
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid login credentials');
  }
  return user;
}



const User = mongoose.model('User', userSchema, 'users');



module.exports = User;
