import express from 'express';
import isAuth from '../middleware/isAuth.js';
import { allOrders, placeOrder, updateStatus, userOrders } from '../controllers/orderController.js';
import adminAuth from '../middleware/adminAuth.js';

const oredrRoutes = express.Router();

// FOR USER
oredrRoutes.post("/placeorder",isAuth,placeOrder)
oredrRoutes.post("/userorder",isAuth,userOrders)

// FOR ADMIN
oredrRoutes.post("/list",adminAuth,allOrders)
oredrRoutes.post("/status",adminAuth,updateStatus)



export default oredrRoutes