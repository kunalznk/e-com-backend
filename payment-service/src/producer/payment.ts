import { producer } from "../config/kafka";
import { kafkaTopics } from "../utils/constant";
const {PAYMENT_SUCCESS, PAYMENT_FAIL } = kafkaTopics.PAYMENT_TOPIC

const paymentSuccess = async (order: any) => {
    try {
        await producer.send({
            topic: PAYMENT_SUCCESS,
            messages: [
                {
                    value: JSON.stringify(order),
                    key: order._id,
    
                }
            ]
        })
        
    } catch (error) {
        console.log(error)
    }
}

const paymentFailed = async (order: any) => {
    try {
        await producer.send({
            topic: PAYMENT_FAIL,
            messages: [
                {
                    value: JSON.stringify(order),
                    key: order._id,
    
                }
            ]
        })
    } catch (error) {
        console.log(error)
    }
}


export default { paymentSuccess , paymentFailed };