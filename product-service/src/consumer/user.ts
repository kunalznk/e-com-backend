import { Consumer, EachMessagePayload } from "kafkajs"
import { UserModel as User ,buildUser } from "../models/userModel";
import { kafkaTopics } from "../utils/constant";

const userCreateConsumer = async (event: EachMessagePayload) : Promise<void> => {
    try {
        const { message } = event;
        const usetToBuild = JSON.parse(message.value as unknown as string);
        usetToBuild._id = usetToBuild.id;
        const user = buildUser(usetToBuild);
        await user.save({
            validateBeforeSave: true
        })
    } catch (error) {
        console.log(error)
    }

}

const userUpdatedConsumer = async (event: EachMessagePayload) : Promise<void> => {
    try {
        const { message } = event;

        const userInfo = JSON.parse(message.value as unknown as string);
        await User.findOneAndUpdate({
            _id: userInfo._id
        }, {
            $set: {
                firstName: userInfo.firstName,
                lastName: userInfo.lastName,
                address: userInfo.address
            }
        })
    } catch (error) {
        console.log(error)
    }

}

const userDeletedConsumer = async (event: EachMessagePayload) : Promise<void> => {
    try {
        const { message } = event;
        await User.findByIdAndDelete(
            message.value?.toString()
        )
    } catch (error) {
        console.log(error)
    }

}

export const runUserCosunmer = async (cs: Consumer) => {
    await cs.connect();
    await cs.subscribe({
        topics: [kafkaTopics.USER_TOPIC.USER_REGISTERED, kafkaTopics.USER_TOPIC.USER_DELETED, kafkaTopics.USER_TOPIC.USER_UPDATED],
        fromBeginning: true
    })
    cs.run({
        autoCommit:false,
        eachMessage: async (event : EachMessagePayload) => {
            try {
                const { topic } = event;
                if(topic === kafkaTopics.USER_TOPIC.USER_REGISTERED){
                    await userCreateConsumer(event);
                }
                if(topic === kafkaTopics.USER_TOPIC.USER_UPDATED){
                    await userUpdatedConsumer(event);
                }
                if(topic === kafkaTopics.USER_TOPIC.USER_DELETED){
                    await userDeletedConsumer(event);
                }
            } catch (error) {
                console.log(error)
            }
        }
    })
}   

