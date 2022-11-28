import { Request , Response } from "express"
import  {UserModel as User , buildUser} from "../models/userModel"
import { deleteUserEvent, updateUserEvent } from "../producer/user";
import { producer } from "../config/kafka"
import { buildFailMessage, buildSuccessMessage } from "../utils/common";
import { updateUserSchema } from "../utils/yup";

const currentUser = async (req: Request, res:Response) => {
    try {
        // const user = req.body;
        const id = req.user?.id;
        const user = await User.findById(id);
        const { data , statusCode } = buildSuccessMessage(user);
        res.status(statusCode).json(data);
    } catch (error) {
        const {data , statusCode } = buildFailMessage(error);
        res.status(statusCode).json(data);   
    }
}

const updateUser = async (req: Request, res:Response) => {
    try {
        await updateUserSchema.validate(req.body)
        const id = req.user?.id;
        const { firstName, lastName, address } = req.body;
        const user = await User.findOneAndUpdate({
            _id: id 
        }, {
            firstName,  
            lastName,
            $push: { address }
        }, {
            new:true,
            
        })
        const { data , statusCode } = buildSuccessMessage(user);
        updateUserEvent(producer, user?.toJSON())
        res.status(statusCode).json(data);
    } catch (error) {
        const {data , statusCode } = buildFailMessage(error);
        res.status(statusCode).json(data);   
    }
}

const deleteUser = async (req: Request, res:Response) => {
    try {
        // get userId from token
        // deleteUserEvent
        // onThatEvent delete all data related to that user
        // send res
        // const param = req.params;
        const id = req.user?.id;
        await User.findByIdAndDelete(
            id
        )
        const { data , statusCode } = buildSuccessMessage([]);
        deleteUserEvent(producer, id);
        res.status(statusCode).json(data);
    } catch (error) {
        const {data , statusCode } = buildFailMessage(error);
        res.status(statusCode).json(data);   
    }
}

export default { currentUser ,updateUser, deleteUser}