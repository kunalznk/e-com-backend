import { Document, HydratedDocument, model, Schema } from "mongoose";
import { Product, productSchema } from "./productModel";


interface Cart extends Document{
    userId: string,
    products: [Product],
    price: number,
    status: string,
}

const cartSchema = new Schema<Cart>({
    userId: { type: String, required: true },
    products: { type: [productSchema], required: true },
    price: { type: Number, required: true },
    status: { type: String, required: true, default: "" },
});


export const CartModel = model<Cart>('cart' , cartSchema, 'carts');

export const buildCart = (cart: Cart): HydratedDocument<Cart> => {
    return new CartModel(cart);
} 

