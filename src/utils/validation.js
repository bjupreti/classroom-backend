import Joi from '@hapi/joi';

// Auth validation
export const authValidation = (body) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(8).required()
  });
  return schema.validate(body);
};
