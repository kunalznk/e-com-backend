require('dotenv').config()
import { Consumer, Kafka, logLevel, Producer } from 'kafkajs';
import { kafkaClients, kafkaTopics } from '../utils/constant';
const { KAFKA_BROKER_1 } = process.env;
const kafka = new Kafka({
    brokers: [KAFKA_BROKER_1!],
    clientId: kafkaClients.PAYMENT_CLIENT,
    logLevel: logLevel.ERROR
})



export const producer: Producer = kafka.producer({
    retry:{
        retries: 10
    },
    allowAutoTopicCreation:true
})

export const consumer: Consumer = kafka.consumer({
    groupId: kafkaTopics.ORDER_TOPIC.ORDER_ADDED+"_GRP_"+2,
    retry:{
        retries: 10
    }
})

