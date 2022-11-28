import { Router } from "express";
import productController from "../controller/productController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { permMiddleware } from "../middlewares/permMiddleware";
const productRoute = Router();


productRoute.post("/products" , authMiddleware , permMiddleware , productController.addProduct);
productRoute.get("/products" , productController.getProducts);
productRoute.put("/products/:productId" , authMiddleware , permMiddleware ,productController.updateProduct)
productRoute.delete("/products/:productId" , authMiddleware , permMiddleware , productController.deleteProduct)

export default productRoute;