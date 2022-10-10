import joi, { Schema } from 'joi';

const createPageSchema: Schema = joi.object({
  urlName: joi.string()
    .pattern(/^[A-Za-z0-9_-]+$/)
    .required()
    .messages({
      'string.base': 'URL Name must be text',
      'string.pattern.base': 'URL Name must contain only letters without accents, numbers, underscores and dashes.',
      'any.required': 'URL Name field is required'
    }),
  title: joi.string()
    .required()
    .messages({
      'string.base': 'Title must be text',
      'any.required': 'Title field is required'
    })
});

export default createPageSchema;