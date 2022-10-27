import { connection } from '../db/database.js';
import dayjs from 'dayjs';

const TABLE = 'clients';

async function postOrder(req, res) {
    const { clientId, cakeId, quantity, totalPrice } = req.body;

    try {
        const InsertOrder=await connection.query(`INSERT INTO orders ("clientId","cakeId",quantity,"createdAt","totalPrice") VALUES ($1,$2,$3,$4,$5)`,
        [clientId, cakeId, quantity, dayjs().format('DD/MM/YYYY HH:mm:ss'), totalPrice]);

        return res.sendStatus(201);
    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
} 
  
export {postOrder};