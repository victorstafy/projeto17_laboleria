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
  
async function getClientOrder(req, res) {
    const  paramsObj = req.params;
    const clientId=paramsObj.id;

    try {

        const searchClientId=await connection.query(`SELECT * FROM clients WHERE id=$1`,[clientId]);

        console.log(searchClientId.rows)

        if (searchClientId.rowCount===0){
            return res.sendStatus(404);
        }

        const getClientOrders = await connection.query(`
        SELECT orders.id AS "orderId", 
        orders.quantity, orders."createdAt",
        orders."totalPrice",
        cakes.name AS "cakeName"
        FROM clients 
        JOIN orders ON  clients.id=orders."clientId"
        JOIN cakes ON  cakes.id=orders."cakeId"
        WHERE clients.id=$1
        ORDER BY orders.id ASC;
        `,[clientId])

        const getAllClientOrders=getClientOrders.rows;

        const ordersArray=getAllClientOrders.map( (order) =>({
            orderId: order.orderId,
            quantity: order.quantity,
            createdAt: order.createdAt,
            totalPrice: order.totalPrice,
            cakeName:order.cakeName
        })
        )

        return res.status(200).send(ordersArray);
    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
} 

export {postClient,getClientOrder};