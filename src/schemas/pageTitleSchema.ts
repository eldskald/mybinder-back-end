import joi, { Schema } from 'joi';

const pageTitleSchema: Schema = joi.object({
  title: joi.string()
    .pattern(/^[A-Za-z0-9_-]+$/)
    .min(3)
    .max(50)
    .required()
    .messages({
      'string.base': 'Title must be a text',
      'string.pattern.base': 'Title must contain only letters without accents, numbers, underscores and dashes.',
      'string.min': 'Title must be at least 3 characters long',
      'string.max': 'Title must be at most 50 characters long',
      'any.required': 'Title field is required'
    })
  });

  export default pageTitleSchema;