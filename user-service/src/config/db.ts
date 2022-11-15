require('dotenv').config()
import mongoose, { Connection } from "mongoose";

const { MONGO_USER, MONGO_HOST, MONGO_PORT, MONGO_PASSWORD,DATABASE} = process.env
const mongoUrl = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}`;

let mongo : Connection | undefined
(async () => {
    try {
        mongo = await mongoose.createConnection(mongoUrl , {
            dbName: DATABASE,
            autoIndex: true,
        }).asPromise();
        
    } catch (error) {
        console.log(error)
    }
    
    
}) ()

export default mongo
