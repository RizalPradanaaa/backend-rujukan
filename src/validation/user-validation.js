import Joi from "joi";

const registerUserValidation = Joi.object({
  phone: Joi.string().max(20).required(),
  name: Joi.string().max(100).required(),
  age: Joi.number().integer().positive().required(),
  address: Joi.string().max(255).required(),
  longitude: Joi.number().required(),
  latitude: Joi.number().required(),
  password: Joi.string().max(100).required(),
});

const loginUserValidation = Joi.object({
  phone: Joi.string().max(20).required(),
  password: Joi.string().max(100).required(),
});

const updateUserValidation = Joi.object({
  phone: Joi.string().max(20).required(),

  name: Joi.string().max(100).optional(),
  age: Joi.number().integer().positive().optional(),
  address: Joi.string().max(255).optional(),
  longitude: Joi.number().required(),
  latitude: Joi.number().required(),
  password: Joi.string().max(100).optional(),
});

export { registerUserValidation, loginUserValidation };
