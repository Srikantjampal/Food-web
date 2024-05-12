import express from 'express';
import { UpdateStatus, listOrders, placeorder, userOrder, verifyOrder } from '../controllers/orderController.js';
import authMiddleware from '../middlewares/auth.js';

const orderRouter = express.Router();

orderRouter.post("/place",authMiddleware,placeorder);
orderRouter.post("/verify",verifyOrder);
orderRouter.post("/userorders",authMiddleware,userOrder);
orderRouter.post("/status",UpdateStatus);
orderRouter.get("/list",listOrders);


export default orderRouter;