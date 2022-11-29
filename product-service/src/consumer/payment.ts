import { Consumer, EachMessagePayload } from "kafkajs"
import { ProductModel as Product ,buildProduct } from "../models/productModel";
import { Product as Prod } from "../models/productModel"
import { kafkaTopics } from "../utils/constant";
const { PAYMENT_SUCCESS, PAYMENT_FAIL } = kafkaTopics.PAYMENT_TOPIC;


const paymentSuccess = async (event: EachMessagePayload) : Promise<void> => {
    try {
                const { message } = event;
                const order : { products : Prod[] } = JSON.parse(message.value as unknown as string);
                order.products.forEach(async ({_id , qty }) => {
                    await Product.findByIdAndUpdate(_id , {
                        $inc: { qty : qty * -1}
                    })
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

