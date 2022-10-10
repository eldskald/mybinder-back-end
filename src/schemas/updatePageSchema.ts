import joi, { Schema } from 'joi';

const updatePageSchema: Schema = joi.object({
  urlName: joi.string()
    .pattern(/^[A-Za-z0-9_-]+$/)
    .messages({
      'string.base': 'URL Name must be text',
      'string.pattern.base': 'URL Name must contain only letters without accents, numbers, underscores and dashes.',
    }),
  title: joi.string()
    .messages({
      'string.base': 'Title must be text'
    })
});

export default updatePageSchema;