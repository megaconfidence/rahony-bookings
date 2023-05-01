import joiPhone from 'joi-phone-number';
import {validate, Joi as Joy} from 'express-validation';

const Joi = Joy.extend(joiPhone);

const schema = {
  body: Joi.object({
    name: Joi.string().required(),
    tnxStatus: Joi.string().required(),
    tnxRef: Joi.string().required(),
    departure: Joi.string().required(),
    destination: Joi.string().required(),
    seats: Joi.number().min(1).required(),
    email: Joi.string().required().email(),
    date: Joi.date()
      .greater(new Date().setDate(new Date().getDate() - 1))
      .required(),
    phone: Joi.string().phoneNumber({format: 'e164', strict: true}).required(),
  }),
};

export const create = validate(schema, {keyByField: true}, {abortEarly: false});
