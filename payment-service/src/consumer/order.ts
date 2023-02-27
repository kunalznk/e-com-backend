import { Consumer, EachMessagePayload } from "kafkajs"
import { PaymentModel as Payment , buildPayment } from "../models/paymentModel";
import { kafkaTopics, ORDER_STATUS } from "../utils/constant";
const { ORDER_ADDED, ORDER_CACEL, ORDER_RETURN, ORDER_COMPLETED } = kafkaTopics.ORDER_TOPIC;


const orderCreateConsumer = async (event: EachMessagePayload) : Promise<void> => {
    try {
        const { message } = event;
        const paymentToBuild = JSON.parse(message.value as unknown as string);
        const payment = buildPayment(paymentToBuild);
        await payment.save({
            validateBeforeSave: true
        })
    } catch (error) {
        console.log(error)
    }

}

const orderCancelConsumer = async (event: EachMessagePayload) : Promise<void> => {
    try {
        const { message } = event;
        const orderId = message.value as unknown as string;
        await Payment.findByIdAndUpdate({
            _id: orderId
        }, {
            status: ORDER_STATUS.CANCEL
        })
    } catch (error) {
        console.log(error)
    }

}


export const runOrderCosunmer = async (cs: Consumer) => {
    await cs.connect();
    await cs.subscribe({
        topics: [ORDER_ADDED, ORDER_CACEL, ORDER_RETURN]
    })
    cs.run({
        autoCommit:false,
        eachMessage: async (event : EachMessagePayload) => {
            try {
                const { topic } = event;
                if(topic === ORDER_ADDED){
                    await orderCreateConsumer(event);
                }
                if(topic === ORDER_CACEL){
                    await orderCancelConsumer(event);
                }
                
                
            } catch (error) {
                console.log(error)
            }
        }
    })
}   

