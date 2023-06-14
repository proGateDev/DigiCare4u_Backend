const Joi = require("joi");

const userCreationValidation = Joi.object({
  name: Joi.string().required(),
  dob: Joi.string().required(),

});

module.exports = userCreationValidation;
