require('dotenv').config()
import mongoose from "mongoose";

const { MONGO_USER, MONGO_HOST, MONGO_PORT, MONGO_PASSWORD,DATABASE} = process.env
const mongoUrl = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}`;

const mongo = mongoose.connect(mongoUrl ,  {
    autoIndex:false,
    autoCreate:true,
    dbName:DATABASE,
}, ()=> {
    console.log("connected")
});


// let mongo : mongodb.MongoClient | undefined
// (async () => {
//     try {
//         const mongoInstance = await mongoose.createConnection(mongoUrl , {
//             dbName: DATABASE,
//             autoIndex: true,
//         }).asPromise();
        
//         mongo = await mongoInstance?.getClient().connect()
//         console.log("Connected to db")
        
//     } catch (error) {
//         console.log(error)
//     }
    
    
// }) ()

export default mongo
