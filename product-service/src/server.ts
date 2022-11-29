import { runPaymentCosunmer } from './consumer/payment';
require("dotenv").config()
import express, { Request, Response } from "express"
import cors from "cors"

import productRoute from "./routes/productRoutes";
import mongo from "./config/db"
import { runUserCosunmer } from "./consumer/user";
import { runOrderCosunmer } from "./consumer/order";
import { consumer, producer, orderConsumer, paymentConsumer } from "./config/kafka";

const app = express();
app.use(cors({
    origin:"*"
}))

mongo

app.use(express.json());
app.use("/api" , productRoute);

app.get("/test" , (_req: Request, res: Response) => {
    res.status(200).json("Server is Running")
})

producer.connect().then(() => console.log("producer connected")).catch((e) => console.log("producer cant connect", e));


// runUserCosunmer(consumer).then(() => console.log("Consumer connected")).catch((e) => console.log("Consumer cant connect", e));
runOrderCosunmer(orderConsumer).then(() => console.log("Order Consumer connected")).catch((e) => console.log("Consumer cant connect", e));
runPaymentCosunmer(paymentConsumer).then(() => console.log("Payment Consumer connected")).catch((e) => console.log("Consumer cant connect", e));


app.listen(+process.env.HTTP_PORT! , () => {
    console.log("Servier is listening on port ", +process.env.HTTP_PORT!)
})
