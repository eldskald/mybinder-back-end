import joi, { Schema } from 'joi';

const changeDisplaynameSchema: Schema = joi.object({
  newName: joi.string()
    .pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ0-9 _'-]+$/)
    .min(3)
    .max(50)
    .required()
    .messages({
      'string.base': 'Display name must be a text',
      'string.min': 'Display name must be at least 3 characters long',
      'string.max': 'Display name must be at most 50 characters long',
      'any.required': 'Display name field is required'
    })
});

export default changeDisplaynameSchema;