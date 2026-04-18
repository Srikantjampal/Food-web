import express from 'express';
import { addToCart,removeFromCart,getCart, removeAllItemFromCartById, clearAllCartData } from '../controllers/cartController.js';
import authMiddleware from '../middlewares/auth.js';

const cartRouter= express.Router();

cartRouter.post('/add',authMiddleware,addToCart);
cartRouter.post('/remove',authMiddleware,removeFromCart);
cartRouter.post('/get',authMiddleware,getCart);
cartRouter.post('/remove-all-itemId',authMiddleware,removeAllItemFromCartById);
cartRouter.post('/clear-all',authMiddleware,clearAllCartData);

export default cartRouter;