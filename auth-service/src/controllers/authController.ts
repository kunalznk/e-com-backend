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
import { buildFailMessage, buildSuccessMessage, ResetPasswordEmailTemplate, verifyEmailTemplate } from './../utils/common';

export const signUp = async (req: Request, res: Response , )  => {

    try {
        await CreateUserInputSchema.validate(req.body);
        const { emailId , password , phoneNumber , role } = req.body;
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

export const resetpassword = async (req: Request, res: Response , ) => {

    try {
        await ResetPasswordInputSchema.validate(req.body);
        const { emailId } = req.body;
        const auth = await Auth.findOne({
            where: {
                emailId
            }
        })
        
        let token = jwt.sign(auth!.toJSON() , process.env.JWT_SECRET_KEY! , CONSTANTS.jwtOption)
        
        const html = ResetPasswordEmailTemplate(token)
        sendMail(emailId, html , "Reset Your Password");
        
        const { data , statusCode } = buildSuccessMessage([]);

        res.status(statusCode).json(data);
    } catch (error) {
     
     const {data , statusCode } = buildFailMessage(error);
     res.status(statusCode).json(data);
    
    }
}

export const verifyEmail = async (req: Request, res: Response , ) => {

    try {
        await VerifyEmailInputSchema.validate(req.params);
        let token : string = "";
        token  = req.query.token! as string;
        let auth = {};
        if(token) {

            const { payload  }  = jwt.verify(token , process.env.JWT_SECRET_KEY!) as JwtPayload
            auth = await Auth.update({
                isVerified: true
            }, {
                where: {
                    id: payload?.id
                }
            })

        }
        const { data , statusCode } = buildSuccessMessage(auth);

        res.status(statusCode).json(data);
    } catch (error) {
     
     const {data , statusCode } = buildFailMessage(error);
     res.status(statusCode).json(data);
    
    }
}

export const resendVerifyEmail = async (req: Request, res: Response , ) => {

    try {
        await ResetPasswordInputSchema.validate(req.body);
        const { emailId } = req.body;
        const auth = await Auth.findOne({
            where: {
                emailId
            }
        })
        
        let token = jwt.sign(auth!.toJSON() , process.env.JWT_SECRET_KEY! , CONSTANTS.jwtOption)
        const html = verifyEmailTemplate(token)
        sendMail(emailId, html , "Verify Your Email");
        
        const { data , statusCode } = buildSuccessMessage([]);

        res.status(statusCode).json(data);
    } catch (error) {
     
     const {data , statusCode } = buildFailMessage(error);
     res.status(statusCode).json(data);
    
    }
}

export const updatePassword = async (req: Request, res: Response , ) => {

    try {
        await UpdatePasswordInputSchema.validate(req.body);
        const { token , password, newPassword } = req.body;
       
        let id = 0 // req.user.id  userId from token from header or body
        if(token) {
            const verifiedToken = jwt.verify(token, process.env.JWT_SECRET_KEY!) as JwtPayload;
            const { payload } = verifiedToken;
            id = payload.id
        } else {
            const verifiedToken = jwt.verify(req.headers.authorization!, process.env.JWT_SECRET_KEY!) as JwtPayload;
            const { payload } = verifiedToken;
            id = payload.id
        }
        const auth = await Auth.findOne({
            where: {
                id 
            }
        })

        if(!token) {
            const isValid =  bcrypt.compare( password , auth?.password! );
            if(!isValid) throw new Error("Invalid Credentials")
        }

        await Auth.update({
            password: newPassword,
        }, {
            where: {
                id
            }
        })
        
                
        const { data , statusCode } = buildSuccessMessage(auth);

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