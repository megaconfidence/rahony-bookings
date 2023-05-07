import joiPhone from 'joi-phone-number';
import {validate, Joi as Joy} from 'express-validation';

const Joi = Joy.extend(joiPhone);

const schema = {
  body: Joi.object({
    departure: Joi.string().required(),
    destination: Joi.string().required(),
  }),
};

export const get = validate(schema, {keyByField: true}, {abortEarly: false});
