const Joi = require("joi");

const userCreationValidation = Joi.object({
  name: Joi.string().required(),
  dob: Joi.string().required(),
  time: Joi.string().required(),
  gender: Joi.string().required(),
  location: Joi.object({
    name: Joi.string().required(),
    lat: Joi.number().required(),
    long: Joi.number().required(),
  }).required(),
});

module.exports = userCreationValidation;
  