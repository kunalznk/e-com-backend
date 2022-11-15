import { Document, model, Schema } from "mongoose";
import { User } from "../utils/type";

const userSchema = new Schema<User>({
    firstName: { type: String , required: true},
    lastName: { type: String , required: true},
    emailId: { type: String , required: true},
    address: { type: Array, required: false , default: []}
});


const User = model<User>('users' , userSchema);

const buildUser = (user: User): Document<any> => {
    return new User(user);
} 

export default { User , buildUser}