require('dotenv').config()
import { Request , Response } from 'express';
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt";
import randomstring from "randomstring";

import { LoginInputSchema } from './../utils/yup';
import { CreateUserInputSchema } from '../utils/yup';

import Auth from '../models/authModel';
import CONSTANTS from '../utils/constants'

import { sendMail } from './../config/email';
import { buildFailMessage, buildSuccessMessage, verifyEmailTemplate } from './../utils/common';

export const signUp = async (req: Request, res: Response , )  => {

    try {
        await CreateUserInputSchema.validate(req.body);
        const { emailId , password , phoneNumber , role } = req.body;
        const expiresAt = (Date.now() + 60000 * 10) as unknown as string;
        const otp = +randomstring.generate({
            charset:"1234567890",
            length:6
        });
        const hanhedPassword = await bcrypt.hash(password, 10);
        const auth = await Auth.create({
            emailId, 
            password: hanhedPassword, 
            phoneNumber, 
            role,
            otp,
            expiresAt
        })

        let token = '';
        if(auth) 
        {
            token = jwt.sign(auth.toJSON() , process.env.JWT_SECRET_KEY! , CONSTANTS.jwtOption)
        }
        const html = verifyEmailTemplate(token)
        sendMail(emailId, html , "Verify Your Account");
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
        const auth = await Auth.findOne({
            where: {
                emailId
            }
        })

        if(!auth) {
            throw new Error("Invalid Credentials")
        }
        const isValidPassword =  bcrypt.compare(password , auth?.password);
        if(!isValidPassword) {
            throw new Error("Invalid Credentials")
        }

        let token = '';
        token = jwt.sign(auth.toJSON() , process.env.JWT_SECRET_KEY! , CONSTANTS.jwtOption
        )
        
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