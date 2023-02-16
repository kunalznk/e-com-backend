import { Request, Response } from "express";
import { CartModel as Cart , buildCart } from "../models/cartModel";
import { ProductModel as Product} from "../models/productModel";
import { buildFailMessage, buildSuccessMessage } from "../utils/common";
import { addToCartItemSchema, deleteCartItemSchema } from "../utils/yup";
import { Types } from "mongoose";

const addToCart = async (req: Request , res: Response) => {
    try {
        /*
        db.carts.updateOne({_id: new ObjectId("63ebba7a078437565ee5c472"), "products.id": "63ea6af0a700d18bb29100be"}, { $inc: {"products.$.quantity": 5 } });
        */
        const { productId, qty } = req.body;
        const userId = req.user?.id;
        await addToCartItemSchema.validate(req.body)
        const product =  await Product.findOne({
            _id: productId,
            quantity: {$gte: qty}
        });
        const isProduct =  await Cart.findOne({
            userId,
            status: "",
            "products._id" : new Types.ObjectId(productId)
        },{
            "products._id":1,
            "products.quantity":1
        } );
        if(product) {
            let cart;
            let quantity = qty;

            if(Boolean(isProduct)) {
            isProduct?.products.forEach((ele) =>{ if(ele._id.toString() === productId) quantity = ele.quantity})
    
            cart = await Cart.findOneAndUpdate({
            userId,
            status: "",
        }, {
            $addToSet: { products: { ...product?.toJSON() , quantity  }}
        }, {
            upsert: true,
            new: true
            })
            } else {
             cart = await Cart.findOneAndUpdate({
            userId,
            status: "",
        }, {
            $push: { products:{ ...product?.toJSON(), quantity:qty }}
        }, {
            upsert: true,
            new: true
            });
            }
            if(Boolean(isProduct)) {
                await Cart.findOneAndUpdate({
                    userId,
                    status: "",
                    "products._id" : new Types.ObjectId(productId)
                }, {
                     $inc: {"products.$.quantity": quantity }
                }) 
            }
            
            const { data , statusCode } = buildSuccessMessage(cart);
            res.status(statusCode).json(data);
        } else {
            throw new Error("Product Not Found !!")
        }
        
       
    } catch (error) {
        const {data , statusCode } = buildFailMessage(error);
        res.status(statusCode).json(data);
    }
}

const deleteCartItem = async (req: Request , res: Response) => {
    try {

        await deleteCartItemSchema.validate(req.body);
        const userId = req.user?.id;
        const { cartId , productId, quantity } = req.body;
        let cart;
        if(Boolean(quantity)){
            cart = await Cart.findOneAndUpdate({
                userId, 
                _id: new Types.ObjectId(cartId),
                status: "",
                "products._id" : new Types.ObjectId(productId)
            }, {
                $inc : { "products.$.quantity": quantity * - 1 }
            })
        }else {
            if(Boolean(productId)){
                cart = await Cart.findOneAndUpdate({
                    userId, 
                    _id: new Types.ObjectId(cartId),
                    status: "",
                    "products._id" : new Types.ObjectId(productId)
                }, {
                    $pull : { products: {_id: new Types.ObjectId(productId)} }
                }, {
                    new: true
                })
            } else {
                cart = await Cart.deleteOne({
                    _id: new Types.ObjectId(cartId),
                })
                cart  = [];
            }
        }
             
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