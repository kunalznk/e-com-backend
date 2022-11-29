import { Consumer, Kafka, logLevel, Producer } from 'kafkajs';
import { kafkaClients, kafkaTopics } from '../utils/constant';

const kafka = new Kafka({
    brokers: ["127.0.0.1:9092"],
    clientId: kafkaClients.PRODUCT_CLIENT,
    logLevel: logLevel.ERROR
})



export const producer: Producer = kafka.producer({
    retry:{
        retries: 10
    },
    allowAutoTopicCreation:true
})

export const consumer: Consumer = kafka.consumer({
    groupId: kafkaTopics.USER_TOPIC.USER_REGISTERED+"_GRP_"+2,
    retry:{
        retries: 10
    }
})

export const orderConsumer: Consumer = kafka.consumer({
    groupId: kafkaTopics.ORDER_TOPIC.ORDER_ADDED+"_GRP_"+1,
    retry:{
        retries: 10
    }
})

export const paymentConsumer: Consumer = kafka.consumer({
    groupId: kafkaTopics.PAYMENT_TOPIC.PAYMENT_ADDED+"_GRP_"+1,
    retry:{
        retries: 10
    }
})
