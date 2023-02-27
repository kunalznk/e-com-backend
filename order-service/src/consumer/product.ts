import { Consumer, EachMessagePayload } from "kafkajs"
import { ProductModel as Product , buildProduct } from "../models/productModel";
import { kafkaTopics } from "../utils/constant";
const { PRODUCT_ADDED , PRODUCT_UPDATED, PRODUCT_DELETED  }  = kafkaTopics.PRODUCT_TOPIC

const prodAddedConsumer = async (event: EachMessagePayload) : Promise<void> => {
    try {
        const { message } = event;
        const prod = buildProduct(JSON.parse(message.value as unknown as string ));
        await prod.save({
            validateBeforeSave: true
        })
    } catch (error) {
        console.log(error)
    }

}

const prodUpdatedConsumer = async (event: EachMessagePayload) : Promise<void> => {
    try {
        const { message } = event;
        const prodInfo = JSON.parse(message.value as unknown as string);
        ;
        await Product.findByIdAndUpdate({
            _id: prodInfo._id
        }, {
            ...prodInfo
        })
    } catch (error) {
        console.log(error)
    }

}

const prodDeletedConsumer = async (event: EachMessagePayload) : Promise<void> => {
    try {
        const { message } = event;
        const _id = message.value?.toString();
        await Product.findByIdAndDelete({
            _id
        })
    } catch (error) {
        console.log(error)
    }

}

export const runProdCosunmer = async (cs: Consumer) => {
    await cs.connect();
    await cs.subscribe({
        topics: [PRODUCT_ADDED , PRODUCT_UPDATED, PRODUCT_DELETED],
        fromBeginning: true
    })
    cs.run({
        autoCommit:false,
        eachMessage: async (event : EachMessagePayload) => {
            try {
                const { topic } = event;
                if(topic === PRODUCT_ADDED){
                    await prodAddedConsumer(event);
                }
                if(topic === PRODUCT_UPDATED){
                    await prodUpdatedConsumer(event);
                }
                if(topic === PRODUCT_DELETED){
                    await prodDeletedConsumer(event);
                }
            } catch (error) {
                console.log(error)
            }
        }
    })
}   

