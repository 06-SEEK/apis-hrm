const { validate } = require('express-validation');

/**
 * Alternate default express-validation function
 * @param {Object} schema
 * @returns
 */
const configValidate = (schema) => validate(schema, { keyByField: true }, {});

module.exports = {
  validate: configValidate,
};
