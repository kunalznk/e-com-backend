import { Request , Response } from "express"
import  {ProductModel as Product , buildProduct} from "../models/productModel"
import { buildFailMessage, buildSuccessMessage } from "../utils/common";
import { addProductSchema, updateProductSchema } from "../utils/yup";
import productEvent from "../producer/product"

const getProducts = async (_req: Request, res:Response) => {
    try {
        // get product by id , seller id , catergory 
        //
        const products = await Product.findOne()
        const { data , statusCode } = buildSuccessMessage(products);
        res.status(statusCode).json(data);
    } catch (error) {
        const {data , statusCode } = buildFailMessage(error);
        res.status(statusCode).json(data);   
    }
}

const addProduct = async (req: Request, res:Response) => {
    try {
        const sellerId = req.user?.id // from req
        await addProductSchema.validate({...req.body , sellerId});
        const product = buildProduct({...req.body , sellerId});
        const pr = await product.save()
        // pro added event topic 
        const { data , statusCode } = buildSuccessMessage(pr);
        await productEvent.productAddedEvent(pr);
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
        await productEvent.productUpdatedEvent(product);
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
        await productEvent.productDeletedEvent(productId);
        res.status(statusCode).json(data);
    } catch (error) {
        const {data , statusCode } = buildFailMessage(error);
        res.status(statusCode).json(data);   
    }
}

export default { getProducts , addProduct, updateProduct, deleteProduct}