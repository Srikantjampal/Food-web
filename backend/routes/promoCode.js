import express from  'express';
import { applyPromoCode, Create, Delete, Generate, getAllPromoCodes } from '../controllers/promoCodeController.js';


const promoCodeRouter = express.Router()

promoCodeRouter.post("/create",Create)
promoCodeRouter.get("/list",getAllPromoCodes)
promoCodeRouter.delete("/delete",Delete)
promoCodeRouter.get("/generate",Generate)
promoCodeRouter.post("/validate",applyPromoCode)


export default promoCodeRouter;