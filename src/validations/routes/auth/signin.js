import joiPhone from 'joi-phone-number';
import {validate, Joi as Joy} from 'express-validation';

const Joi = Joy.extend(joiPhone);

const schema = {
  body: Joi.object({
    email: Joi.string().email(),
    password: Joi.string().min(5).required(),
    signinkey: Joi.string().valid('email', 'phone').required(),
    phone: Joi.string().phoneNumber({format: 'e164', strict: true}),
  }),
};
export default validate(schema, {keyByField: true}, {abortEarly: false});
