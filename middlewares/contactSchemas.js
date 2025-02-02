const Joi = require('joi');

const contactAddSchema = Joi.object({
    name: Joi.string().required(),
    phone: Joi.string().required(),
    email: Joi.string().required(),
    favorite: Joi.boolean(),
  });
  
  const updateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required(),
  });
  
  const schemas = {
    contactAddSchema,
    updateFavoriteSchema,
  };

  module.exports = schemas