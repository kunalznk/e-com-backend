require('dotenv').config()
import { Consumer, Kafka, logLevel, Producer } from 'kafkajs';
import { kafkaClients, kafkaTopics } from '../utils/constant';
const { KAFKA_BROKER_1 } = process.env;
const kafka = new Kafka({
    brokers: [KAFKA_BROKER_1!],
    clientId: kafkaClients.ORDER_CLIENT,
    logLevel: logLevel.ERROR
})



export const producer: Producer = kafka.producer({
    retry:{
        retries: 10
    },
    allowAutoTopicCreation:true
})

export const consumer: Consumer = kafka.consumer({
    groupId: kafkaTopics.PRODUCT_TOPIC.PRODUCT_ADDED+"_GRP_"+1,
    retry:{
        retries: 10
    }
})

export const paymentConsumer: Consumer = kafka.consumer({
    groupId: kafkaTopics.PAYMENT_TOPIC.PAYMENT_ADDED+"_GRP_"+2,
    retry:{
        retries: 10
    }
})
