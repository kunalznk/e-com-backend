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


export default mongo
