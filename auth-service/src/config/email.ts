require('dotenv').config()
import { createTransport } from 'nodemailer';

export const transport = createTransport({
    
    service:"gmail",
    auth:{
     
            pass:process.env.PASS,
            user:process.env.USER
    }
})


transport.verify((err, success) => {
    if(err) {
        console.error("SMTP Server failure")
    } else console.log("SMTP Server configured suceesfully" , success);
})

export const sendMail = (to: string , html : string, subject: string , cc ?: string  ) => {
    
    transport.sendMail({
        to,
        cc,
        html,
        subject,
    })
}