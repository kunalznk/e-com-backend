require('dotenv').config()
import { Consumer, Kafka, logLevel, Producer } from 'kafkajs';
import { kafkaClients, kafkaTopics } from '../utils/constants';
const { KAFKA_BROKER_1 } = process.env;

const kafka = new Kafka({
    brokers: [KAFKA_BROKER_1!],
    clientId: kafkaClients.AUTH_CLIENT,
    logLevel: logLevel.ERROR
})

export const producer: Producer = kafka.producer({
    retry:{
        retries: 10
    },
    allowAutoTopicCreation:true
})

export const consumer: Consumer = kafka.consumer({
    groupId: kafkaTopics.USER_TOPIC.USER_REGISTERED+"_GRP_"+3,
    retry:{
        retries: 10
    }
})

