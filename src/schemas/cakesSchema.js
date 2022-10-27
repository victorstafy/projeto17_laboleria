import joi from 'joi';

const cakesSchema = joi.object({
  name: joi.string().trim().min(2).required(),
  price: joi.number().empty('').positive().greater(0).required(),
  image: joi.string().uri().required(),
  description: joi.string().allow(null, ''),
});

export { cakesSchema };