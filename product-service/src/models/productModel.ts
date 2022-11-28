import { Document, HydratedDocument, model, Schema } from "mongoose";

interface Product extends Document{
    title: string,
    desc: string,
    brand: string
    category: {}
    qty: number,
    price: number,
    images: [],
    avgRating: number 
    variant: {}
    isDiscounted: number
    sellerId: number

}

const productSchema = new Schema<Product>({
    title: { type: String , required: true, unique: true},
    desc: { type: String , required: true},
    brand: { type: String , required: true},
    category: { type: Schema.Types.Mixed, default: {}, required: true},
    qty: { type: Number , required: true},
    price: { type: Number , required: true},
    images: { type: [] , required: true},
    avgRating: { type: Number , required: true},
    variant: { type: Schema.Types.Mixed, default: {} , required: true},
    isDiscounted: { type: Number , required: true},
    sellerId: { type: Number , required: true}
    
});

export const ProductModel = model<Product>('products' , productSchema, 'products');

export const buildProduct = (product: Product): HydratedDocument<Product> => {
    return new ProductModel(product);
} 

/*
    productId: 
    title: 
    desc: 
    brand:
    category: {
        Mobile & Accessor 
        sub: {
            sub: {

            }
        }
    },
    qty:,
    price: 
    images: []
    avgRating: random(1,5)
    variant: {
        size: [],
        color: []
    },
    isDiscounted:
    sellerId: 
 
 */
    
    
/*
electronics : {
    Camera & Photo
    Cell Phones & Accessories
    Car & Vehicle Electronics
    Computers & Accessories
    Headphones
    Home Audio
    Portable Audio & Video
    Television & Video
    Video Game Consoles & Accessories
    Video Projectors
    Wearable Technology
    eBook Readers & Accessories
}

computer: {
Computer Accessories & Peripherals
Computer Components
Computers & Tablets
Data Storage
External Components
Laptop Accessories
Monitors
Networking Products
Power Strips & Surge Protectors
Printers
Scanners
Servers
Tablet Accessories
Tablet Replacement Parts
Warranties & Services
}

women's fashion{
Clothing
Shoes
Jewelry
Watches
Handbags
Accessories
}

men's fashion{
Clothing
Shoes
Watches
Accessories
}
*/