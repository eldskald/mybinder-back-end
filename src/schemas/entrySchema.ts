import joi, { Schema } from 'joi';

const entrySchema: Schema = joi.object({
  title: joi.string()
    .messages({
      'string.base': 'Title must be text'
    }),
  description: joi.string()
    .messages({
      'string.base': 'Description must be text'
    }),
  text: joi.string()
    .messages({
      'string.base': 'Text must be text'
    }),
  imageUrl: joi.string()
  .uri()
  .messages({
    'string.base': 'Image URL must be text',
    'string.uri': 'Image URL must be a valid URI'
  }),
  sourceUrl: joi.string()
    .uri()
    .messages({
      'string.base': 'Source URL must be text',
      'string.uri': 'Source URL must be a valid URI'
    }),
  space: joi.number()
    .integer()
    .positive()
    .messages({
      'number.base': 'Space must be numeric',
      'number.integer': 'Space must be an integer',
      'number.positive': 'Space must be positive'
    })
});

export default entrySchema;