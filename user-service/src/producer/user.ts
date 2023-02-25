import { Producer } from "kafkajs";
import { kafkaTopics } from "../utils/constant";

export const updateUserEvent = async (pr : Producer, user: any): Promise<void> => {
    
        await pr.connect()
        await pr.send({
        topic: kafkaTopics.USER_TOPIC.USER_UPDATED,
        messages: [
            {
                value: JSON.stringify(user),
                key: user._id + "_updated_user",
            }
        ]
    })

}

export const deleteUserEvent = async (pr : Producer, userId: any): Promise<void> => {
    
    await pr.connect()
    await pr.send({
    topic: kafkaTopics.USER_TOPIC.USER_DELETED,
    messages: [
        {
            value: userId,
            key: userId + "_deleted_user",
        }
    ]
})

}