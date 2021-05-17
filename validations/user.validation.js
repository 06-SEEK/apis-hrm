const Joi = require('joi');


//validation for routes
module.exports = {
	// POST /api/users/register
	register: {
		body: Joi.object({
			email: Joi.string().email().required(),
			password: Joi.string().required(),
		}),
	},
	// POST /api/users/login
    login: {
        body: Joi.object({
			email: Joi.string().email().required(),
			password: Joi.string().required(),
		}),
    }
};
