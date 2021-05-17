const { ValidationError } = require('express-validation');
const httpStatus = require('http-status');

/** 
	*Class representing an API error.
	*@param {string} message - Error message.
   	*@param {number} statusCode - HTTP status code of error.
   	*@param {boolean} isOperational - Whether the stack should be visible or not. True if not visible.
*/
class ApiError extends Error {
	constructor(statusCode, message, isOperational = false) {
		super(message);
		this.statusCode = statusCode;
		this.message = message;
		this.isOperational = isOperational;
	}
}

/**
 * Error handler. Log stacktrace if isOperational = true
 */
const errorHandler = (err, req, res, next) => {
	const statusCode = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
	const message = err.message || httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
	if (!err.isOperational) {
		console.error(err.stack);
	}
	res.status(statusCode).json({
		status: statusCode,
		message,
	});
};

/**
 * If error is not an instanceOf APIError, convert it.
 */
const converter = (err, req, res, next) => {
	let convertedError = err;
	if (err instanceof ValidationError) {
		convertedError = new ApiError(err.statusCode, 'Validation Error', true);
	}
	else if (!(err instanceof ApiError)) {
		convertedError = new ApiError(err.status, err.message);
	}

	return errorHandler(convertedError, req, res);
}

/**
 * Catch 404 and forward to error handler
 */
const notFound = (req, res, next) => {
	const err = new ApiError(httpStatus.NOT_FOUND, 'Not found', true);
	return errorHandler(err, req, res);
};

module.exports = {
	ApiError,
    errorHandler,
	notFound,
	converter
};
