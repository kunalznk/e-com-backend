import { Producer } from "kafkajs";
import { kafkaTopics } from "../utils/constants";
import { User } from "../utils/yup"

export const createUserCreateEvent = async (pr : Producer, user:User): Promise<void> => {
    
        await pr.send({
        topic: kafkaTopics.USER_TOPIC.USER_REGISTERED,
        messages: [
            {
                value: JSON.stringify(user),
                key: user.id.toString(),
            }
        ]
    })
}