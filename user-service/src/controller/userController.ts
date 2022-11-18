import { Request , Response } from "express"
import  {UserModel as User , buildUser} from "../models/userModel"
import { buildFailMessage, buildSuccessMessage } from "../utils/common";
import { updateUserSchema } from "../utils/yup";

const currentUser = async (req: Request, res:Response) => {
    try {
        // const user = req.body;
        const id = 2;
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
        const id = 1;
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
        const id = 2;
        await User.deleteOne({
            _id: id
        })
        const { data , statusCode } = buildSuccessMessage([]);
        res.status(statusCode).json(data);
    } catch (error) {
        const {data , statusCode } = buildFailMessage(error);
        res.status(statusCode).json(data);   
    }
}

export default { currentUser ,updateUser, deleteUser}