import { Router } from "express";
import { signIn, signUp, resetpassword, verifyEmail, resendVerifyEmail, updatePassword} from "../controllers/authController";

const authRoute = Router();


authRoute.post("/signup" , signUp);
authRoute.post("/signin" , signIn)
authRoute.post("/resetpassword", resetpassword)
authRoute.patch("/updatepassword", updatePassword)
authRoute.post("/verifyemail/:token", verifyEmail)
authRoute.post("/verifyemail/resend", resendVerifyEmail)


export default authRoute;