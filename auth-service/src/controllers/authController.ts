require('dotenv').config()
import { Request , Response } from 'express';
import jwt, { JwtPayload } from "jsonwebtoken"
import bcrypt from "bcrypt";
import randomstring from "randomstring";

import { LoginInputSchema, ResetPasswordInputSchema, UpdatePasswordInputSchema, VerifyEmailInputSchema } from './../utils/yup';
import { CreateUserInputSchema } from '../utils/yup';

import Auth from '../models/authModel';
import CONSTANTS from '../utils/constants'

import { sendMail } from './../config/email';
import { buildFailMessage, buildSuccessMessage, InvalidDataError, ResetPasswordEmailTemplate, verifyEmailTemplate } from './../utils/common';
import { createUserCreateEvent } from '../producer/auth';
import { producer } from '../config/kafka';

const signUp = async (req: Request, res: Response , )  => {

    try {
        await CreateUserInputSchema.validate(req.body);
        const { emailId , password , phoneNumber , role , firstName , lastName} = req.body;
        const expiresAt = (Date.now() + 60000 * 10) as unknown as string;
        const otp = +randomstring.generate({
            charset:"1234567890",
            length:6
        });

        // add phoneNumber OTP Service
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
        createUserCreateEvent(producer, {...auth.toJSON(), firstName, lastName});
        const { id , isVerified , role: Role} = auth.toJSON();
        const { data , statusCode } = buildSuccessMessage({id, isVerified, role: Role});
        res.status(statusCode).json(data);

} catch (error) {
     
     const {data , statusCode } = buildFailMessage(error);
     res.status(statusCode).json(data);
    
    }
}

const signIn = async (req: Request, res: Response , ) => {

    try {
        await LoginInputSchema.validate(req.body);
        const { emailId , password } = req.body;
        const auth = await Auth.findOne({
            where: {
                emailId
            }
        })

        if(!auth) {
            throw new InvalidDataError("Invalid Credentials")
        }
        const isValidPassword =  await bcrypt.compare(password , auth?.password);
        if(!isValidPassword) {
            throw new  InvalidDataError("Invalid Credentials")
        }

        let token = '';
        token = jwt.sign(auth.toJSON() , process.env.JWT_SECRET_KEY! , CONSTANTS.jwtOption
        )
        const { id , isVerified , role: Role} = auth?.toJSON();
        const { data , statusCode } = buildSuccessMessage({id , isVerified , role: Role , token});
        res.cookie("token", token);
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