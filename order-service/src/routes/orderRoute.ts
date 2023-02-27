import { Router } from "express";
import orderController from "../controller/orderController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { permMiddleware } from "../middlewares/permMiddleware";
const orderRoute = Router();


orderRoute.get("/orders" , authMiddleware , permMiddleware, orderController.getOrders)
orderRoute.get("/orders/:orderId" , authMiddleware , permMiddleware,  orderController.getOrdersById)
orderRoute.post("/orders" , authMiddleware , permMiddleware, orderController.createOrder)
orderRoute.post("/orders/:orderId/cancel" , authMiddleware , permMiddleware,  orderController.cancelOrder)
orderRoute.post("/orders/:orderId/return" , authMiddleware , permMiddleware ,orderController.returnOrder)

export default orderRoute;