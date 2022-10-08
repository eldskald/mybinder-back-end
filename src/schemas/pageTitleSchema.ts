import joi, { Schema } from 'joi';

const pageTitleSchema: Schema = joi.object({
  title: joi.string()
    .pattern(/^[A-Za-z0-9_-]+$/)
    .min(3)
    .max(50)
    .required()
    .messages({
      'string.base': 'Link must be a text',
      'string.pattern.base': 'Link must contain only letters without accents, numbers, underscores and dashes.',
      'string.min': 'Link must be at least 3 characters long',
      'string.max': 'Link must be at most 50 characters long',
      'any.required': 'Link field is required'
    })
  });

  export default pageTitleSchema;