import { createTransport } from 'nodemailer';

const transport = createTransport({
    
    service:"gmail",
    auth:{
     
    }
})


transport.verify((err, success) => {
    if(err) {
        console.error(err)
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