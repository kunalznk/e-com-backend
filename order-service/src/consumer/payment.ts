import { Consumer, EachMessagePayload } from "kafkajs"
import { CartModel } from "../models/cartModel";
import { OrderModel } from "../models/orderModel";
import { ProductModel as Product } from "../models/productModel";
import { Product as Prod } from "../models/productModel"
import { kafkaTopics, ORDER_STATUS } from "../utils/constant";
const { PAYMENT_SUCCESS, PAYMENT_FAIL } = kafkaTopics.PAYMENT_TOPIC;


const paymentSuccess = async (event: EachMessagePayload) : Promise<void> => {
    try {
                const { message } = event;
                const order : { _id: string} = JSON.parse(message.value as unknown as string);
                await OrderModel.findByIdAndUpdate(order._id ,{
                    status: ORDER_STATUS.PAYMENT_SUCCESS
                })
                await CartModel.findOneAndUpdate({
                    userId: order.userId,
                    status:ORDER_STATUS.WAITING_FOR_PAYMENT
                }, {
                    status:ORDER_STATUS.PAYMENT_SUCCESS
                })
            } catch (error) {
                console.log(error)
            }
}

const paymentFail = async (event: EachMessagePayload) : Promise<void> => {
    try {
                const { message } = event;
                const order : { products : Prod[] } = JSON.parse(message.value as unknown as string);
                order.products.forEach(async ({_id , qty }) => {
                    await Product.findByIdAndUpdate(_id , {
                        $inc: { qty : qty } 
                    })
                })
                await CartModel.findOneAndUpdate({
                    userId: order.userId,
                    status:ORDER_STATUS.WAITING_FOR_PAYMENT
                }, {
                    status:ORDER_STATUS.PAYMENT_FAILED
                })
            } catch (error) {
                console.log(error)
            }
}

export const runPaymentCosunmer = async (cs: Consumer) => {
    await cs.connect();
    await cs.subscribe({
        topics: [PAYMENT_FAIL, PAYMENT_SUCCESS],
        fromBeginning: true
    })
    cs.run({
        autoCommit:false,
        eachMessage: async (event : EachMessagePayload) => {
            try {
                const { topic } = event;
                console.log(topic)
                if(topic === PAYMENT_SUCCESS){
                    await paymentSuccess(event);
                }
                if(topic === PAYMENT_FAIL){
                    await paymentFail(event);
                }

            } catch (error) {
                console.log(error)
            }
        }
    })
}   

