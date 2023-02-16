import { Request , Response } from "express"
import  {ProductModel as Product , buildProduct} from "../models/productModel"
import { buildFailMessage, buildSuccessMessage } from "../utils/common";
import { addProductSchema, updateProductSchema } from "../utils/yup";
import productEvent from "../producer/product"
import { _FilterQuery } from "mongoose";

function between(min, max) {  
    return Math.floor(
      Math.random() * (max - min) + min
    )
  }

const calculatePrice = () => {
    const before_price = between(2000, 40000)
    const savings_percent = between(40,80);
    const savings_amount = parseInt(((before_price/100) * savings_percent).toFixed(0));
    const current_price = parseInt((before_price- savings_amount).toFixed(0));
    
    return {
        symbol: 'INR',
        currency: 'INR',
        discounted: true,
        before_price,
        current_price,
        savings_amount,
        savings_percent
    }
}

const getProducts = async (req: Request, res:Response) => {
    try {
    
        const { rating , categories , price , reviews , title, available} = req.body;
        const { offset , limit} = req.query;
        const upto = limit ? +limit : 20 ;
        const page = offset ? +offset * upto : 0;
        let filters : _FilterQuery<typeof  Product>= { };
        if(price) {
         filters["price.current_price"] = { $gte: price?.min  , $lte: price?.max   }
        }
        if(rating) {
         filters["reviews.rating"]=   { $in : rating };
        }
        if(reviews) {
            filters["reviews.total_reviews"]=   { $gte : reviews };
        }
        if(categories) {
         filters["categories"] = {$in: categories}
        }
        if(title) {
            filters["title"] = { $regex : `/${title}/`}
        }
        if(available) {
            filters["item_available"] = available
        }

        const products = await Product.find(filters).limit(upto).skip(page);
        const { data , statusCode } = buildSuccessMessage(products);
        res.status(statusCode).json(data);
    } catch (error) {
        const {data , statusCode } = buildFailMessage(error);
        res.status(statusCode).json(data);   
    }
}

const addProduct = async (req: Request, res:Response) => {
    try {
        const sellerId = req.user?.id
        await addProductSchema.validate({...req.body , sellerId});
        const product = buildProduct({...req.body , sellerId});
        const pr = await product.save()
        // pro added event topic 
        const { data , statusCode } = buildSuccessMessage(pr);
        productEvent.productAddedEvent(pr);
        res.status(statusCode).json(data);
    } catch (error) {
        const {data , statusCode } = buildFailMessage(error);
        res.status(statusCode).json(data);   
    }
}

const updateProduct = async (req: Request, res:Response) => {
    try {
        // const sellerId = 2 // from req
        if(!req?.params?.productId) throw new Error("Validation Error")
        const { productId } = req.params;
        await updateProductSchema.validate(req.body);
        const productSpec = req.body;
        const product = await Product.findByIdAndUpdate(productId , {
            $set: {
                ...productSpec,
                category: productSpec.category,
                variant: productSpec.variant,
            }
        }, {
            new: true
        })
        const { data , statusCode } = buildSuccessMessage(product);
        productEvent.productUpdatedEvent(product);
        res.status(statusCode).json(data);
    } catch (error) {
        const {data , statusCode } = buildFailMessage(error);
        res.status(statusCode).json(data);   
    }
}

const deleteProduct = async (req: Request, res:Response) => {
    try {
        if(!req?.params?.productId) throw new Error("Validation Error")
        const { productId } = req.params;
        await Product.findByIdAndDelete(productId!)
        const { data , statusCode } = buildSuccessMessage([]);
        productEvent.productDeletedEvent(productId);
        res.status(statusCode).json(data);
    } catch (error) {
        const {data , statusCode } = buildFailMessage(error);
        res.status(statusCode).json(data);   
    }
}

export default { getProducts , addProduct, updateProduct, deleteProduct}