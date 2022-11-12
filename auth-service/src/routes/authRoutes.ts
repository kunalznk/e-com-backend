import { Router } from "express";
import { signIn, signUp } from "../controllers/authController";

const authRoute = Router();


authRoute.post("/signup" , signUp);
authRoute.post("/signin" , signIn)
authRoute.post("/resetpassword")
authRoute.post("/updatepassword")
authRoute.post("/verifyemail/:token")
authRoute.post("/verifyemail/resend")


export default authRoute;