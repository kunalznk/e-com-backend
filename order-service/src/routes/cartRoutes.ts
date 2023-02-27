import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { permMiddleware } from "../middlewares/permMiddleware";
import cartController from "../controller/cartController";
const cartRoute = Router();


cartRoute.get("/orders/cart/latest" , authMiddleware , permMiddleware , cartController.getCart)
cartRoute.post("/orders/cart" , authMiddleware , permMiddleware , cartController.addToCart)
cartRoute.patch("/orders/cart" , authMiddleware , permMiddleware , cartController.deleteCartItem)

export default cartRoute;