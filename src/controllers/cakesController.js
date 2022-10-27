import { connection } from '../db/database.js';

const TABLE = 'cakes';

async function postCake(req, res) {

    const { name, price, image, description } = req.body;
    try {

        const InsertUser=await connection.query(`INSERT INTO cakes (name,price,image,description) VALUES ($1,$2,$3,$4)`,
        [name,price,image,description]);

        return res.sendStatus(201);
    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
} 
  
export {postCake};