import Joi from '@hapi/joi';

// Auth validation
export const authValidation = (body) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(8).required()
  });
  return schema.validate(body);
};

// Course validation
export const courseValidation = (body) => {
  const schema = Joi.object({
    courseName: Joi.string().max(255).required(),
    programName: Joi.string().max(255).required(),
    subject: Joi.string().max(255).required(),
    semester: Joi.string().max(255).required(),
    startDate: Joi.date().min('now').required()
  });
  return schema.validate(body);
};
