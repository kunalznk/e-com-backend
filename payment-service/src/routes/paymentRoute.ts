import { Router } from "express";
import paymentController from "../controller/paymentController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { permMiddleware } from "../middlewares/permMiddleware";
const paymentRoute = Router();

paymentRoute.patch("/payment/success" ,authMiddleware ,  permMiddleware ,paymentController.paymentSuccess)
paymentRoute.patch("/payment/fail"  ,authMiddleware ,  permMiddleware , paymentController.paymentFailed)

export default paymentRoute;