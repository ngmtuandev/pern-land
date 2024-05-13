const Joi = require("joi");

exports.string = Joi.string().allow(null, '');
exports.stringRequired = Joi.string().required();
exports.number = Joi.number().allow(null, '');
exports.numberRequired = Joi.number().required();
exports.arrayRequired = Joi.array().required();
exports.array = Joi.array().allow(null, '');