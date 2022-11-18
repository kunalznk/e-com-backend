import { Consumer, Kafka, Producer } from 'kafkajs';

const kafka = new Kafka({
    brokers: ["127.0.0.1:9092"],
    clientId: "user-client"
})

export const producer: Producer = kafka.producer({
    retry:{
        retries: 1
    }
})

export const consumer: Consumer = kafka.consumer({
    groupId: "USER_CREATED_1",
    retry:{
        retries: 1
    }
})

