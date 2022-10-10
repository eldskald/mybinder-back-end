import joi, { Schema } from 'joi';

const updatePageSchema: Schema = joi.object({
  urlName: joi.string()
    .uri()
    .messages({
      'string.base': 'URL Name must be text',
      'string.uri': 'URL Name must be a valid URI'
    }),
  title: joi.string()
    .messages({
      'string.base': 'Title must be text'
    })
});

export default updatePageSchema;