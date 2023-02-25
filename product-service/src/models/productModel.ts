import { Document, HydratedDocument, model, Schema } from "mongoose";

export interface Product extends Document{
    _id: string,
    title: string, 
    description: string,
    categories: string[],
    images: string[],
    feature_bullets: string[],
    item_available: boolean,
    main_image: string,
    product_information: string[],
    reviews: {
        total_reviews: number,
        rating: number,
        answered_questions: number
    },
    price: {
        symbol: string,
        currency: string,
        current_price: number,
        discounted: boolean,
        before_price: number,
        savings_amount: number,
        savings_percent: number
    },
    total_images:number,
    url: string,
    variants: { } | undefined
     quantity: number         
            

}

const productSchema = new Schema<Product>({
    title: { type: String , required: true, unique: true},
    description: { type: String },
    categories: { type: [String] }, 
    images:  { type: [String] }, 
    feature_bullets:  { type: [String] }, 
    item_available: { type: Boolean }, 
    main_image: { type: String },
    product_information:  { type: [String] }, 
    reviews: {
        total_reviews:  { type: Number }, 
        rating: { type: Number }, 
        answered_questions: { type: Number }, 
    },
    price: {
        symbol: { type: String },
        currency: { type: String },
        current_price: { type: Number }, 
        discounted: { type: Boolean }, 
        before_price: { type: Number }, 
        savings_amount: { type: Number }, 
        savings_percent: { type: Number }, 
    },
    total_images:{ type: Number }, 
    url: { type: String },
     variants: { type: Schema.Types.Mixed, default: undefined},
     quantity: { type: Number }
    // sellerId: { type: String , required: true}
    
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