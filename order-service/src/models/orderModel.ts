import { Document, HydratedDocument, model, Schema } from "mongoose";
import { UserAddress } from "../utils/type";
import { Product, productSchema } from "./productModel";


interface Order extends Document{
    _id: string,
    userId: string,
    products: Product[],
    status: string,
    invoice: string,
    adderss: UserAddress
}


const userAddr = new Schema<UserAddress>({
    addressLine1:{ type: String , required: true},
    addressLine2:{ type: String , required: false},
    addressType:{ type: String , required: true },
    city:{ type: String , required: true },
    isDefault: { type: Boolean , default:false },
    pinCode:{ type: String , required: true },
    state:{ type: String , required: true }
})

const orderSchema = new Schema<Order>({
    _id: { type: String, required: true },
    userId: { type: String, required: true },
    products: { type: [productSchema], required: true },
    status: { type: String, required: true },
    invoice: { type: String, required: true },
    adderss: { type: userAddr, required: true }
}, {
    _id: false
});


export const OrderModel = model<Order>('order' , orderSchema, 'orders');

export const buildOrder = (order: Order): HydratedDocument<Order> => {
    return new OrderModel(order);
} 

