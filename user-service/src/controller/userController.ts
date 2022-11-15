import { Request , Response } from "express"
import { User , userBuilder} from "../models/userModel"
import { buildFailMessage, buildSuccessMessage } from "../utils/common";

const currentUser = (req: Request, res:Response) => {
    try {
        const user = req.body;
        const { data , statusCode } = buildSuccessMessage(auth);
        res.status(statusCode).json(data);
    } catch (error) {
        const {data , statusCode } = buildFailMessage(error);
        res.status(statusCode).json(data);   
    }
}

const updateUser = (req: Request, res:Response) => {
    try {
        const user = req.body;
        const { data , statusCode } = buildSuccessMessage(auth);
        res.status(statusCode).json(data);
    } catch (error) {
        const {data , statusCode } = buildFailMessage(error);
        res.status(statusCode).json(data);   
    }
}

const deleteUser = (req: Request, res:Response) => {
    try {
        // get userId from token
        // deleteUserEvent
        // onThatEvent delete all data related to that user
        // send res
        const param = req.params;
        const { data , statusCode } = buildSuccessMessage(auth);
        res.status(statusCode).json(data);
    } catch (error) {
        const {data , statusCode } = buildFailMessage(error);
        res.status(statusCode).json(data);   
    }
}

export default { currentUser ,updateUser, deleteUser}