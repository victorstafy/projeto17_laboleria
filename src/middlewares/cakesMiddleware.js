import { connection } from '../db/database.js';
import { cakesSchema } from '../schemas/cakesSchema.js';

async function validCake(req, res, next) {
    const { name, price, image, description } = req.body;

    const isValid = cakesSchema.validate({
        name,
        price,
        image,
        description,
    });
    
  try {

    if (isValid.error) {
        const error_message=isValid.error.details[0].message;

        if (error_message.search('image')===1){
            return res.status(422).send(isValid.error.details);
        }
        return res.status(400).send(isValid.error.details);
    }

    const searchName=await connection.query(`SELECT name FROM cakes WHERE name LIKE $1`,[name])

    if (searchName.rowCount>0){
        return res.status(409).send('Nome repetido');
    }
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
  next();
}

export { validCake };