require("dotenv").config()
import { Request, Response } from "express";
import Razorpay from "razorpay"
import randomstring from "randomstring";
import orderEvent from "../producer/order"



// import { buildProduct , ProductModel as Product } from "../models/productModel";
// import { buildOrder, OrderModel as Order } from "../models/orderModel";
import { buildFailMessage, buildSuccessMessage } from "../utils/common";
import { crateOrderSchema } from "../utils/yup";
import { ProductModel as Product } from "../models/productModel";
import { CartModel as Cart} from "../models/cartModel";
import { HydratedDocument, Types } from "mongoose";
import { buildOrder, OrderModel as Order} from "../models/orderModel";
import { ORDER_STATUS } from '../utils/constant';

// createOrder
// updateOrder ==> cancel 
// paymentUpdate ==>


// delivery service
// updatedDelivery
// 

// notifcation service

// logger service

const createOrder = async (req: Request , res: Response) => {
    try {
        
        // check for product can be order
        // if not send resp order can not be 
        // createOrder with razorpay and tell payment service to listen for 
        // 
        const { productId , cartId , qty } = req.body;
        const userId = req.user?.id;
        const {firstName , lastName, emailId, phoneNumber} = req.user;
        let amount = 0;
        await crateOrderSchema.validate(req.body);
        if((!cartId && (!productId && !qty))) {
            throw new Error("Validation Error Cart or Product should be choosen");
        }
        let productsToBuy: HydratedDocument<typeof Product> | HydratedDocument<typeof Cart> | null;

        if(productId && qty){
             productsToBuy = await Product.findOneAndUpdate({
                _id: new Types.ObjectId(productId),
                quantity: { $gte: qty}
             },
             {
                $inc: {quantity: qty * -1 }
                // if orderSuccess then only 
             });
             amount = productsToBuy.price.current_price;
        } else {
             productsToBuy = await Cart.findById(cartId, {
                where: {
                 staus: false
                }
            })
            // lookup with condition productQty gretat than cart Prod Qty
            // check for product if it can be ordered
            if(productsToBuy) {
                
                
                productsToBuy = productsToBuy?.toJSON();
                productsToBuy?.products.forEach(({price: {current_price} , quantity}) => {
                    amount += (current_price * quantity);
                })
            }
        }

        if(!productsToBuy) {
            throw new Error("Order cannot be proccess at this time");
        }
        const receipt = randomstring.generate({
            charset:"1234567890poiuytrewqlkjhgfdsamnbvcxz",
            length:20
        });
        const rp = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });
        const order  = await rp.orders.create({
            amount,
            currency: "INR",
            receipt,
            notes: {
                "key1": "value3",
                "key2": "value2"
            }
        })
        const builtOrder = buildOrder({
            _id: order.id,
            userId, // take userd from req
            products:  amount > 0 ? productsToBuy.products : productsToBuy ,// [...productsToBuy],
            status: ORDER_STATUS.WAITING_FOR_PAYMENT,
            invoice: ORDER_STATUS.WAITING_FOR_PAYMENT,
            adderss: req.body.address
        })

        const _orderM = await builtOrder.save({
            validateBeforeSave: true
        });
        
        // event orderCreated
        // send res to options object

        const options = {
            key: process.env.RAZORPAY_KEY_ID, 
            amount: order.amount, 
            currency: "INR",
            name: productsToBuy?.title,
            description: productsToBuy?.desc,
            order_id: order.id,
            "prefill": {
                "name": `${firstName} ${lastName}`, // user.name 
                "email": emailId, // user.email
                "contact": phoneNumber // user.contact
            },
            "notes": {
                "address": productsToBuy.address
            },
            "theme": {
                "color": "#3399cc"
            },
            "modal":{
              "confirm_close" : true,
              "animation":true
            },
            "retry":{
              enabled:true,
              max_count:4
            },
            "timeout":300,
            "handler":(_resp: any) => {
            //   const {razorpay_order_id, razorpay_payment_id, signature } = resp;
              // hit the api/payment/:orderId success

            },
            "error":(_resp: any) => {
                // hit the api/payment/:orderId  fail
            },
        };
        const { data , statusCode } = buildSuccessMessage(options);
        // orderCreated event 
        if(amount > 0) {
            productsToBuy.products.forEach(async (product) => {
                const { _id , quantity } = product;
                await Product.findByIdAndUpdate(_id , {
                    $inc: { quantity : quantity * - 1}
                })
                await Cart.findByIdAndUpdate(cartId, {
                    status: ORDER_STATUS.WAITING_FOR_PAYMENT
                })
            })
            orderEvent.orderCreated(_orderM);
        } else {
            orderEvent.orderCreated(_orderM);   
        }
        res.status(statusCode).json(data);
    } catch (error) {
        const {data , statusCode } = buildFailMessage(error);
        res.status(statusCode).json(data);   
    }
}

const cancelOrder = async (req: Request , res: Response) => {
    try {
        
        // get orderId which is within 1 days
        // 
        // then check for orderStatus if its out for delibery or payment successfull or waiting for payment
        // out for delibery ==> send event orderCancel ==> delivery service
        // payment suceess ===> paymrnSucc and if delivery sucess
        // waitign for payment ==> send event for payment serivce to cancel this payment

        // orderStatus ==> "WAITING_FOR_PAYMENT" , "PAYMENT_SUCCESS, "OUT_FOR_DELIVERY" , "COMPLETE"

        const order = await Order.findById(req.params.orderId);
        const { status } = order!;
        if(status == ORDER_STATUS.WAITING_FOR_PAYMENT) {
            // emit event for payment service to cancel this order
            const order = await Order.findByIdAndUpdate(req.params.orderId, {
                status: ORDER_STATUS.CANCEL
            }, {new : true})
            orderEvent.orderCancel(order)
        } 
        else if(status == ORDER_STATUS.PAYMENT_SUCCESS || status == ORDER_STATUS.OUT_FOR_DELIVERY) {
            // emit event for delivery service to stop sevice if not startd or retrub it
        }
        else if(status == ORDER_STATUS.COMPLETE) {
            throw new Error("Order cannot be cancel it can be refunded")
        } 
        const { data , statusCode } = buildSuccessMessage(options);
        res.status(statusCode).json(data);
    } catch (error) {
        const {data , statusCode } = buildFailMessage(error);
        res.status(statusCode).json(data);   
    }
}

const returnOrder = async (req: Request , res: Response) => {
    try {
        
        /*
         get orderId check if its refundable within 10 days and completedOnly
            if not Error 
        if complete chage emit delivey service to to take return
        chage order status to returning
        
        */

        let order = await Order.findById(req.params.orderId); // check for statsus complete

        if(!order) {
            throw new Error("Order cannot be return limit exceeds to return policy")
        } 
        // emit event delivet
        order = await Order.findOneAndUpdate(req.params.orderId , {
            status: ORDER_STATUS.RETURN
        }, {
            new: true
        })

        const { data , statusCode } = buildSuccessMessage(order);
        res.status(statusCode).json(data);
    } catch (error) {
        const {data , statusCode } = buildFailMessage(error);
        res.status(statusCode).json(data);   
    }
}

export default { createOrder , cancelOrder , returnOrder}