const { merge } = require('lodash');
const authResolver = require('./auth');
const userResolver = require('./user');
const historyResolver = require('./history');

module.exports = merge({}, authResolver, userResolver, historyResolver);
