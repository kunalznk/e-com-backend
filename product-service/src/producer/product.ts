import { producer } from "../config/kafka";
import { kafkaTopics } from "../utils/constant";

const productAddedEvent = async (product) => {
    await producer.send({
        topic: kafkaTopics.PRODUCT_TOPIC.PRODUCT_ADDED,
        messages: [
            {
                value: JSON.stringify(product.toJSON()),
                key: product.id,

            }
        ]
    })
}

const productUpdatedEvent = async (product) => {
    await producer.send({
        topic: kafkaTopics.PRODUCT_TOPIC.PRODUCT_UPDATED,
        messages: [
            {
                value: JSON.stringify(product.toJSON()),
                key: product.id,

            }
        ]
    })

}

const productDeletedEvent = async (productId) => {
    // check if id is sold out or not 
    await producer.send({
        topic: kafkaTopics.PRODUCT_TOPIC.PRODUCT_DELETED,
        messages: [
            {
                value: productId,
                key: productId,

            }
        ]
    })


}

export default { productAddedEvent , productDeletedEvent , productUpdatedEvent } 