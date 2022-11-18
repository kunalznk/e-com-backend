import { Producer } from "kafkajs";

export const createUserCreateEvent = async (pr : Producer, user: any): Promise<void> => {
    
    await pr.connect()
    await pr.send({
        topic: "USER_CREATED",
        messages: [
            {
                value: JSON.stringify(user),
                key: ""+1,

            }
        ]
    })
}