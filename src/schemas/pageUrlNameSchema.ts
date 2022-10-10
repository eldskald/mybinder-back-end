import joi, { Schema } from 'joi';

const pageUrlNameSchema: Schema = joi.object({
  urlName: joi.string()
    .pattern(/^[A-Za-z0-9_-]+$/)
    .required()
    .messages({
      'string.base': 'URL Name must be text',
      'string.pattern.base': 'URL Name must contain only letters without accents, numbers, underscores and dashes.',
      'any.required': 'URL Name field is required'
    })
});

export default pageUrlNameSchema;