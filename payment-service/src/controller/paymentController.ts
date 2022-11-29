require("dotenv").config()
import { Request, Response } from "express";
import { PaymentModel as Payment} from "../models/paymentModel";
import { buildFailMessage, buildSuccessMessage } from "../utils/common";
import { ORDER_STATUS } from "../utils/constant";
import paymentEvent from "../producer/payment"

const paymentSuccess = async (req: Request , res: Response) => {

    try {
        const { razorpay_payment_id , razorpay_order_id, razorpay_signature_id } = req.body;
    
        const payment = await Payment.findByIdAndUpdate(razorpay_order_id , {
            status: ORDER_STATUS.PAYMENT_SUCCESS,
            paymentId: razorpay_payment_id
        }, {
            new: true
        });
        
        // verfiy paymentSign
        // emit event payment sucess ==> for delivery , for order to shipment
        const { data , statusCode } = buildSuccessMessage(payment);
        paymentEvent.paymentSuccess(payment)
        res.status(statusCode).json(data);
    } catch (error) {
        const {data , statusCode } = buildFailMessage(error);
        res.status(statusCode).json(data); 
    }  
}

const paymentFailed = async (req: Request , res: Response) => {

    try {
        const { orderId } = req.body;
        const payment = await Payment.findByIdAndUpdate(orderId, {
            status: ORDER_STATUS.PAYMENT_FAILED
        })
        
        // verfiy paymentSign
        // emit evnt paymentfailed = will change to payment failer
        // order will chage status to paymnet failed and product will inc in order and prod service
        
        const { data , statusCode } = buildSuccessMessage(payment);
        paymentEvent.paymentFailed(payment)
        res.status(statusCode).json(data);
    } catch (error) {
        const {data , statusCode } = buildFailMessage(error);
        res.status(statusCode).json(data); 
    }  
}

export default { paymentSuccess, paymentFailed }