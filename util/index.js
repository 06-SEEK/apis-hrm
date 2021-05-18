const error = require('./ApiError');
const catchAsync = require('./catchAsync');

module.exports = {
  ApiError: error.ApiError,
  errorHandler: error.errorHandler,
  notFound: error.notFound,
  converter: error.converter,
  catchAsync,
};
