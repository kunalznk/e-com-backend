import { Consumer, EachMessagePayload } from "kafkajs"
import { ProductModel as Product ,buildProduct } from "../models/productModel";
import { Product as Prod } from "../models/productModel"
import { kafkaTopics } from "../utils/constant";
const { ORDER_ADDED, ORDER_CACEL, ORDER_COMPLETED, ORDER_RETURN } = kafkaTopics.ORDER_TOPIC;


const OrderCreatedOrUpdated = async (event: EachMessagePayload) : Promise<void> => {
    try {
                const { message } = event;
                const order : Prod[] = JSON.parse(message.value as unknown as string);
                order.products.forEach(async ({_id , qty }) => {
                    await Product.findByIdAndUpdate(_id , {
                        $inc: { qty : qty * -1}
                    })
                })
            } catch (error) {
                console.log(error)
            }
}

const OrderCancel = async (event: EachMessagePayload) : Promise<void> => {
    try {
                const { message } = event;
                const order : Prod[] = JSON.parse(message.value as unknown as string);
                order.products.forEach(async ({_id , qty }) => {
                    await Product.findByIdAndUpdate(_id , {
                        $inc: { qty : qty } 
                    })
                })
            } catch (error) {
                console.log(error)
            }
}

export const runOrderCosunmer = async (cs: Consumer) => {
    await cs.connect();
    await cs.subscribe({
        topics: [ORDER_ADDED, ORDER_CACEL],
        fromBeginning: true
    })
    cs.run({
        autoCommit:false,
        eachMessage: async (event : EachMessagePayload) => {
            try {
                const { topic } = event;
                console.log(topic)
                if(topic === ORDER_ADDED){
                    await OrderCreatedOrUpdated(event);
                }
                if(topic === ORDER_CACEL){
                    await OrderCancel(event);
                }
            
            } catch (error) {
                console.log(error)
            }
        }
    })
}   

