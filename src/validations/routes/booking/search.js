import joiPhone from 'joi-phone-number';
import {validate, Joi as Joy} from 'express-validation';

const Joi = Joy.extend(joiPhone);

const schema = {
  body: Joi.object({
    date: Joi.date(),
    ticket: Joi.string(),
    email: Joi.string().required().email(),
    phone: Joi.string().phoneNumber({format: 'e164', strict: true}),
  }),
};

export const search = validate(schema, {keyByField: true}, {abortEarly: false});
