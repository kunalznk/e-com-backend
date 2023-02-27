import { Document, HydratedDocument, model, Schema } from "mongoose";
import { ORDER_STATUS } from "../utils/constant";

interface Product extends Document{
    _id: string,
    quantity: number
}

const productSchema = new Schema<Product>({
    _id: { type: String , required: true},
    quantity: { type: Number , required: true},
}, {
    _id: false
});

interface Payment extends Document {
    _id: string,
    paymentId: string,
    userId: string,
    status: string,
    products: Product[]
    expiresAt: string
}

const paymentSchema = new Schema<Payment>({
    
    _id: { type: String, required: true },
    paymentId: { type: String,  },
    userId: { type: String,  },
    status: { type: String, required: true, default: ORDER_STATUS.WAITING_FOR_PAYMENT },
    products: { type: [productSchema] , required: true},
    expiresAt: { type: String },

}, { _id : false });


export const PaymentModel = model<Payment>('payment' , paymentSchema, 'payments');

export const buildPayment = (payment: Payment): HydratedDocument<Payment> => {
    return new PaymentModel(payment);
} 

// payment should be expiresAt 
// will listen to orderCreated

// payment/success ==> will update payment status to success in paymentModel   

/*
orderId
paymentId
status
expiresAt

payment/success ==> will update payment status to success in paymentModel 

payment/fail ==>  update payment to fail emit event to orderSrv to update order
*/

