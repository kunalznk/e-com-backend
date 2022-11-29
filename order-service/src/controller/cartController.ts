import { Request, Response } from "express";
import { CartModel as Cart , buildCart } from "../models/cartModel";
import { ProductModel as Product} from "../models/productModel";
import { buildFailMessage, buildSuccessMessage } from "../utils/common";
import { addToCartItemSchema, deleteCartItemSchema } from "../utils/yup";

const addToCart = async (req: Request , res: Response) => {
    try {
        const { productId, qty } = req.body;
        const userId = req.user?.id;
        await addToCartItemSchema.validate(req.body)
        const product =  await Product.findById(productId, {}, {
            where: {
                qty: { gte: qty}
            },
        });
        const cart = await Cart.findOneAndUpdate({
            userId,
            status: "",
        }, {
            $push: { products:{ ...product?.toJSON(), qty:qty }}
        }, {
            upsert: true,
            new: true
        })
        const { data , statusCode } = buildSuccessMessage(cart);
        res.status(statusCode).json(data);
    } catch (error) {
        const {data , statusCode } = buildFailMessage(error);
        res.status(statusCode).json(data);
    }
}

const deleteCartItem = async (req: Request , res: Response) => {
    try {

        await deleteCartItemSchema.validate(req.body);
        const userId = req.user?.id;
        const { cartId , productId } = req.body;
        const cart = await Cart.findOneAndUpdate({
            userId, 
            id: cartId
        }, {
            $pull : { products: {_id: productId} }
        }, {
            new: true
        })
        // increment in no of product in prod colle
        const { data , statusCode } = buildSuccessMessage(cart);
        res.status(statusCode).json(data);
    } catch (error) {
        const {data , statusCode } = buildFailMessage(error);
        res.status(statusCode).json(data);
    }
}

const getCart = async (req: Request , res: Response) => {
    try {

        const userId = req.user?.id;
        const cart = await Cart.findOne({
            userId,
            status: "" 
        });
        const { data , statusCode } = buildSuccessMessage(cart);
        res.status(statusCode).json(data);
    } catch (error) {
        const {data , statusCode } = buildFailMessage(error);
        res.status(statusCode).json(data);
    }
}
export default { addToCart, deleteCartItem, getCart }