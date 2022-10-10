import joi, { Schema } from 'joi';

const pageUrlNameSchema: Schema = joi.object({
  urlName: joi.string()
    .uri()
    .required()
    .messages({
      'string.base': 'URL Name must be text',
      'string.uri': 'URL Name must be a valid URI',
      'any.required': 'URL Name field is required'
    })
});

export default pageUrlNameSchema;