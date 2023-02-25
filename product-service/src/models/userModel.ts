import { Document, HydratedDocument, model, Schema } from "mongoose";
import { UserAddress } from "../utils/type";
// import { User } from "../utils/type";

interface User extends Document{
    firstName: string,
    lastName: string,
    emailId: string,
    address: UserAddress[]
}

const userAddr = new Schema<UserAddress>({
    addressLine1:{ type: String , required: true},
    addressLine2:{ type: String , required: true},
    addressType:{ type: String , required: true },
    city:{ type: String , required: true },
    isDefault: { type: Boolean , default:false },
    pinCode:{ type: String , required: true },
    state:{ type: String , required: true }


})

const userSchema = new Schema<User>({
    _id: { type: String , required: true},
    firstName: { type: String , required: true},
    lastName: { type: String , required: true},
    emailId: { type: String , required: true},
    address: { type: [userAddr], required: false , default: undefined}
}, {
    _id: false
});


export const UserModel = model<User>('users' , userSchema);

export const buildUser = (user: User): HydratedDocument<User> => {
    return new UserModel(user);
} 

