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

async function getOrders(req, res) {
    const { date } = req.query;

    try {

        const getOrders=await connection.query(`SELECT * FROM orders`);
        let getAllOrders;

        if (getOrders.rowCount===0){
            return res.status(404).send([]);
        }

        if (date){
            getAllOrders = await connection.query(`
            SELECT clients.id AS "clientId",
            clients.name AS "clientName", 
            clients.address AS "clientAddress",
            clients.phone AS "clientPhone",
            cakes.id AS "cakeId",
            cakes.name AS "cakeName", 
            cakes.price AS "cakePrice",
            cakes.description AS "cakeDescription",
            cakes.image AS "cakeImage",
            orders.id AS "orderId", 
            orders."createdAt", orders."quantity",
            orders."totalPrice" FROM clients 
            JOIN orders ON  clients.id=orders."clientId"
            JOIN cakes ON  cakes.id=orders."cakeId"
            WHERE DATE(orders."createdAt")=$1
            ORDER BY orders.id ASC; 
            `,[date])
        }
        else {
            getAllOrders = await connection.query(`
            SELECT clients.id AS "clientId",
            clients.name AS "clientName", 
            clients.address AS "clientAddress",
            clients.phone AS "clientPhone",
            cakes.id AS "cakeId",
            cakes.name AS "cakeName", 
            cakes.price AS "cakePrice",
            cakes.description AS "cakeDescription",
            cakes.image AS "cakeImage",
            orders.id AS "orderId", 
            orders."createdAt", orders."quantity",
            orders."totalPrice" FROM clients 
            JOIN orders ON  clients.id=orders."clientId"
            JOIN cakes ON  cakes.id=orders."cakeId"
            `)
        }

        const getAllOrdersArray=getAllOrders.rows;

        const ordersArray=getAllOrdersArray.map( (order) =>({
            client: {
                id: order.clientId,
                name: order.clientName,
                address: order.clientAddress,
                phone: order.clientPhone
            },
            cake: {
                id: order.cakeId,
                name: order.cakeName,
                price: order.cakePrice,
                description: order.cakeDescription,
                image: order.cakeImage
            },
            orderId: order.orderId,
            createdAt: order.createdAt,
            quantity: order.quantity,
            totalPrice: order.totalPrice
        })
        )
        

        return res.status(200).send(ordersArray);
    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}

async function getOrderById(req, res) {
    const  paramsObj = req.params;
    const orderId=paramsObj.id;

    try {
        const searchOrederId=await connection.query(`SELECT * FROM orders WHERE id=$1`,[orderId]);
        let getCurrentOrder;

        if (searchOrederId.rowCount===0){
            return res.sendStatus(404);
        }

        getCurrentOrder = await connection.query(`
        SELECT clients.id AS "clientId",
        clients.name AS "clientName", 
        clients.address AS "clientAddress",
        clients.phone AS "clientPhone",
        cakes.id AS "cakeId",
        cakes.name AS "cakeName", 
        cakes.price AS "cakePrice",
        cakes.description AS "cakeDescription",
        cakes.image AS "cakeImage",
        orders.id AS "orderId", 
        orders."createdAt", orders."quantity",
        orders."totalPrice" FROM clients 
        JOIN orders ON  clients.id=orders."clientId"
        JOIN cakes ON  cakes.id=orders."cakeId"
        WHERE orders.id=$1
        `,[orderId])

        const currentOrder={
            client: {
                id: getCurrentOrder.rows[0].clientId,
                name: getCurrentOrder.rows[0].clientName,
                address: getCurrentOrder.rows[0].clientAddress,
                phone: getCurrentOrder.rows[0].clientPhone
            },
            cake: {
                id: getCurrentOrder.rows[0].cakeId,
                name: getCurrentOrder.rows[0].cakeName,
                price: getCurrentOrder.rows[0].cakePrice,
                description: getCurrentOrder.rows[0].cakeDescription,
                image: getCurrentOrder.rows[0].cakeImage
            },
            orderId: getCurrentOrder.rows[0].orderId,
            createdAt: getCurrentOrder.rows[0].createdAt,
            quantity: getCurrentOrder.rows[0].quantity,
            totalPrice: getCurrentOrder.rows[0].totalPrice
        };
        
        return res.status(200).send(currentOrder);
    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}

export {postOrder,getOrders,getOrderById};