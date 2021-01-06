import joiPhone from 'joi-phone-number';
import {validate, Joi as Joy} from 'express-validation';

const Joi = Joy.extend(joiPhone);

const schema = {
  body: Joi.object({
    name: Joi.string().required(),
    departure: Joi.string().required(),
    destination: Joi.string().required(),
    seats: Joi.number().min(1).required(),
    date: Joi.date().greater('now').required(),
    phone: Joi.string().phoneNumber({format: 'e164', strict: true}).required(),
  }),
};

export const create = validate(schema, {keyByField: true}, {abortEarly: false});
