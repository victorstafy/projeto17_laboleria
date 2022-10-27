import joi from 'joi';

const clientsSchema = joi.object({
  name: joi.string().empty('').trim().required(),
  address: joi.string().empty('').trim().required(),
  phone: joi.string().regex(/^[0-9+]{10,11}$/).required(),
});

export { clientsSchema };

