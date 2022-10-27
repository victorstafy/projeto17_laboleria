import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import cakesRoutes from './routes/cakesRoute.js';
import clientsRoutes from './routes/clientsRoute.js';
import ordersRoutes from './routes/ordersRoute.js';

dotenv.config();
const server = express();
server.use(express.json());
server.use(cors());
server.use(cakesRoutes);
server.use(clientsRoutes);
server.use(ordersRoutes);

server.listen(process.env.PORT, () => {
    console.log('Server running on port ' + process.env.PORT);
})
