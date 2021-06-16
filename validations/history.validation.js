const Joi = require('joi');

// validation for routes
module.exports = {
  // POST /api/history/register
  postHistory: {
    body: Joi.object({
      result: Joi.number().required(),
    }),
  },
};
