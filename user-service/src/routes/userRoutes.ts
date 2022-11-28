import { Router } from "express";
import userController from "../controller/userController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { permMiddleware } from "../middlewares/permMiddleware";
const userRoute = Router();


userRoute.get("/currentuser" , userController.currentUser);
userRoute.patch("/user" , authMiddleware , permMiddleware , userController.updateUser)
userRoute.delete("/user" , authMiddleware , permMiddleware  ,userController.deleteUser)

export default userRoute;