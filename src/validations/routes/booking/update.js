import JoiObjectID from 'joi-objectid';
import {validate, Joi} from 'express-validation';

Joi.objectId = JoiObjectID(Joi);

const schema = {
  params: Joi.object({
    id: Joi.objectId().required(),
  }),
  body: Joi.object({
    status: Joi.string().valid('new', 'paid').required(),
  }),
};

export const update = validate(schema, {keyByField: true}, {abortEarly: false});
