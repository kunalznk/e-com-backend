import { Router } from "express";
import userController from "../controller/userController";
const userRoute = Router();


userRoute.get("/currentuser" , userController.currentUser);
userRoute.patch("/user" , userController.updateUser)
userRoute.delete("/user" , userController.deleteUser)

export default userRoute;