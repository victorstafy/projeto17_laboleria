import { clientsSchema } from '../schemas/clientsSchema.js';

async function validClient(req, res, next) {
    const { name, address, phone } = req.body;

    const isValid = clientsSchema.validate({
        name,
        address,
        phone
    });
    
  try {

    if (isValid.error) {
        return res.status(400).send(isValid.error.details);
    }
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
  next();
}

export { validClient };