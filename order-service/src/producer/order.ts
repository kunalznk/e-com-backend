import { producer } from "../config/kafka";
import { kafkaTopics } from "../utils/constant";
const { ORDER_ADDED, ORDER_CACEL, ORDER_RETURN, ORDER_COMPLETED } = kafkaTopics.ORDER_TOPIC

const orderCreated = async (products: any) => {
    try {
        await producer.send({
            topic: ORDER_ADDED,
            messages: [
                {
                    value: JSON.stringify(products),
                    key: products.id,
    
                }
            ]
        })
    } catch (error) {
        console.error(error)
    }
}

const orderCancel = async (order: any) => {
    await producer.send({
        topic: ORDER_CACEL,
        messages: [
            {
                value: JSON.stringify(order),
                key: order.id,

            }
        ]
    })
}

const orderReturn = async (order: any) => {
    await producer.send({
        topic: ORDER_RETURN,
        messages: [
            {
                value: JSON.stringify(order),
                key: order.id,

            }
        ]
    })
}

const orderComplete = async (order: any) => {
    await producer.send({
        topic: ORDER_COMPLETED,
        messages: [
            {
                value: JSON.stringify(order),
                key: order.id,

            }
        ]
    })
}

export default { orderCancel , orderComplete , orderCreated, orderReturn }