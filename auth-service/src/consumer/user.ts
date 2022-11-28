import { Consumer, EachMessagePayload } from "kafkajs"
import { kafkaTopics } from "../utils/constants";
import Auth from '../models/authModel';



// const userUpdatedConsumer = async (event: EachMessagePayload) : Promise<void> => {
//     try {
//         const { message } = event;
//         const userInfo = JSON.parse(message.value as unknown as string);
//         await User.findOneAndUpdate({
//             _id: userInfo._id
//         }, {
//             $set: {
//                 firstName: userInfo.firstName,
//                 lastName: userInfo.lastName,
//                 address: userInfo.address
//             }
//         })
//     } catch (error) {
//         console.log(error)
//     }

// }

const userDeletedConsumer = async (event: EachMessagePayload) : Promise<void> => {
    try {
        const { message } = event;
        await Auth.destroy({
            where:{
                id: message.value?.toString()
            }
        })
    } catch (error) {
        console.log(error)
    }

}

export const runUserCosunmer = async (cs: Consumer) => {
    await cs.connect();
    await cs.subscribe({
        topics: [kafkaTopics.USER_TOPIC.USER_DELETED],
        fromBeginning: true
    })
    cs.run({
        autoCommit:false,
        eachMessage: async (event : EachMessagePayload) => {
            try {
                const { topic } = event;
                if(topic === kafkaTopics.USER_TOPIC.USER_DELETED){
                    await userDeletedConsumer(event);
                }
            } catch (error) {
                console.log(error)
            }
        }
    })
}   

