/* eslint-disable node/no-unpublished-require */
const httpStatus = require('http-status');
const httpMocks = require('node-mocks-http');
const { ApiError, converter } = require('../../../util');

describe('Error middlewares', () => {
  describe('Error converter', () => {
    test('should return the same ApiError object it was called with', () => {
      const error = new ApiError(httpStatus.BAD_REQUEST, 'Any error');
      const next = jest.fn();

      converter(
        error,
        httpMocks.createRequest(),
        httpMocks.createResponse(),
        next
      );
      expect(next).toHaveBeenCalledWith(error);
    });
    test('should convert an error to ApiError and preserve it status and message', () => {
      const error = new Error('Any error');
      error.statusCode = httpStatus.BAD_REQUEST;
      const next = jest.fn();
      converter(
        error,
        httpMocks.createRequest(),
        httpMocks.createResponse(),
        next
      );
      expect(next).toHaveBeenCalledWith(expect.any(ApiError));
      expect(next).toHaveBeenCalledWith(
        expect.objectContaining({
          statusCode: error.statusCode,
          message: error.message,
          isOperational: false,
        })
      );
    });

    test('should convert an error without status to ApiError with status 500', () => {
      const error = new Error('Any error');
      const next = jest.fn();
      converter(
        error,
        httpMocks.createRequest(),
        httpMocks.createResponse(),
        next
      );
      expect(next).toHaveBeenCalledWith(expect.any(ApiError));
      expect(next).toHaveBeenCalledWith(
        expect.objectContaining({
          statusCode: httpStatus.INTERNAL_SERVER_ERROR,
          message: error.message,
          isOperational: false,
        })
      );
    });

    test('should convert an error without message to ApiError with default message of that error status', () => {
      const error = new Error();
      error.statusCode = httpStatus.BAD_REQUEST;
      const next = jest.fn();
      converter(
        error,
        httpMocks.createRequest(),
        httpMocks.createResponse(),
        next
      );
      expect(next).toHaveBeenCalledWith(expect.any(ApiError));
      expect(next).toHaveBeenCalledWith(
        expect.objectContaining({
          statusCode: error.statusCode,
          message: httpStatus[error.statusCode],
          isOperational: false,
        })
      );
    });

    test('should convert any error with status 500 and its message', () => {
      const error = {};
      const next = jest.fn();
      converter(
        error,
        httpMocks.createRequest(),
        httpMocks.createResponse(),
        next
      );
      expect(next).toHaveBeenCalledWith(expect.any(ApiError));
      expect(next).toHaveBeenCalledWith(
        expect.objectContaining({
          statusCode: httpStatus.INTERNAL_SERVER_ERROR,
          message: httpStatus[httpStatus.INTERNAL_SERVER_ERROR],
          isOperational: false,
        })
      );
    });
  });
});
