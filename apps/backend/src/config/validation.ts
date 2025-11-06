import * as Joi from 'joi';

export const validationSchema = Joi.object({
  PORT: Joi.number().integer().min(0).optional(),
  COBALT_API_URL: Joi.string().uri().optional(),
  FRONTEND_ORIGIN: Joi.string().optional()
});
