import { LoginInputSchema } from './../utils/yup';
import { sendMail } from './../config/email';
import { Request } from 'express';
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt";
// import { nanoid }  from "nanoid";
import { CreateUserInputSchema } from '../utils/yup';
import { buildFailMessage, buildSuccessMessage } from './../utils/common';
import Auth from '../models/authModel';

export const signUp = async (req: Request, res: Response , )  => {

    try {
        await CreateUserInputSchema.validate(req.body);
        const { emailId , password , mobileNumber , role } = req.body;
        const otp = 12345 //nanoid(6);
        const expiresAt = Date.now() + 60000 * 10
        const hanhedPassword = await bcrypt.hash(password, 10);
        const auth = await Auth.create({
            emailId, 
            password: hanhedPassword, 
            mobileNumber, 
            role,
            otp,
            expiresAt
        })

        const html = `<h1>${otp}<h1>`
        sendMail(emailId, html , "Verify");
        const { data , statusCode } = buildSuccessMessage(auth);
        res.status(statusCode).json(data);

} catch (error) {
     
     const {data , statusCode } = buildFailMessage(error);
     res.status(statusCode).json(data);
    
    }
}

export const signIn = async (req: Request, res: Response , ) => {

    try {
        await LoginInputSchema.validate(req.body);
        const { emailId , password } = req.body;
        const hanhedPassword = await bcrypt.hash(password, 10);
        const auth = await Auth.findByPk(emailId)
        if(!auth) {
            throw new Error("emailId or password is incorrect")
        }
        const success = await bcrypt.compare(password , auth?.password);

        let token = '';
        if(success) 
        {
            token = jwt.sign(auth , "jwtSecret")
        } 
        else throw new Error("emailId or password is incorrect")



        const html = `<h1>${otp}<h1>`
        sendMail(emailId, html , "Verify");
        const { data , statusCode } = buildSuccessMessage({auth , token});
        res.status(statusCode).json(data);

} catch (error) {
     
     const {data , statusCode } = buildFailMessage(error);
     res.status(statusCode).json(data);
    
    }
}

export default {
    signUp,
    signIn
}