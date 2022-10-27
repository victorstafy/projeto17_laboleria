import { connection } from '../db/database.js';

const TABLE = 'clients';

async function postClient(req, res) {

    const { name, address, phone } = req.body;
    try {

        const InsertClient=await connection.query(`INSERT INTO clients (name,address,phone) VALUES ($1,$2,$3)`,
        [name,address,phone]);

        return res.sendStatus(201);
    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
} 
  
export {postClient};