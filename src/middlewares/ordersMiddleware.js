import { connection } from '../db/database.js';

async function validOrder(req, res, next) {
    const { clientId, cakeId, quantity, totalPrice } = req.body;

    try {
        const searchClient=await connection.query(`SELECT id FROM clients WHERE clients.id=$1`,[clientId]);
        const searchCake=await connection.query(`SELECT id FROM cakes WHERE cakes.id=$1`,[cakeId]);

        if (searchClient.rowCount===0){
            return res.status(404).send('Cliente não encontrado');
        }

        if (searchCake.rowCount===0){
            return res.status(404).send('Bolo não encontrado');
        }

        if( !(quantity>0 && quantity<5) ){
            return res.status(400).send('quantidade fora dos limites');
        }
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
    next();
}

export { validOrder };