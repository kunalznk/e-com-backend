import { Consumer, EachMessagePayload } from "kafkajs"
import { UserModel as User , buildUser } from "../models/userModel";

const userCreateConsumer = async (event: EachMessagePayload) : Promise<void> => {
    try {
        console.log(JSON.parse(event.message.value))
        
        const { topic , partition, message } = event;
        const user = buildUser(JSON.parse(message.value));
        await user.save({
            validateBeforeSave: true
        })
    } catch (error) {
        console.log(error)
    }

}

export const runAuthCosunmer = async (cs: Consumer) => {
    await cs.connect();
    await cs.subscribe({
        topics: ["USER_CREATED"]
    })
    cs.run({
        autoCommit:false,
        eachMessage: async (event : EachMessagePayload) => {
            try {
                
                await userCreateConsumer(event);
                
            } catch (error) {
                console.log(error)
            }
        }
    })
}   

