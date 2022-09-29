import joi, { Schema } from 'joi';

const signInSchema: Schema = joi.object({
  username: joi.string()
    .pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ0-9 _'-]+$/)
    .min(3)
    .max(50)
    .required()
    .messages({
      'string.base': 'Username must be a text',
      'string.min': 'Username must be at least 3 characters long',
      'string.max': 'Username must be at most 50 characters long',
      'any.required': 'Username field is required'
    }),
  displayname: joi.string()
    .pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ0-9 _'-]+$/)
    .min(3)
    .max(50)
    .required()
    .messages({
      'string.base': 'Display name must be a text',
      'string.min': 'Display name must be at least 3 characters long',
      'string.max': 'Display name must be at most 50 characters long',
      'any.required': 'Display name field is required'
    }),
  password: joi.string()
    .min(6)
    .max(24)
    .required()
    .messages({
      'string.base': 'Password must be a text',
      'string.min': 'Password must be at least 6 characters long',
      'string.max': 'Password must be at most 24 characters long',
      'any.required': 'Password field is required'
    })
});

export default signInSchema;