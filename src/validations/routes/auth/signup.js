import joiPhone from 'joi-phone-number';
import {validate, Joi as Joy} from 'express-validation';

const Joi = Joy.extend(joiPhone);

const schema = {
  body: Joi.object({
    lastname: Joi.string().required(),
    firstname: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(5).required(),
    phone: Joi.string().phoneNumber({format: 'e164', strict: true}).required(),
  }),
};
export default validate(schema, {keyByField: true}, {abortEarly: false});
