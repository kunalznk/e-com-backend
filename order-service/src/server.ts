require("dotenv").config()
import express, { Request, Response } from "express"
import cors from "cors"

import orderRoute from "./routes/orderRoute"
import cartRoute from "./routes/cartRoutes"
import { runProdCosunmer } from "./consumer/product"
import { consumer, producer , paymentConsumer} from "./config/kafka"
import mongo from "./config/db"
import { runPaymentCosunmer } from "./consumer/payment"

const app = express();

app.use(cors({
    origin:"*"
}))

mongo

app.use(express.json());
app.use("/api" , orderRoute);
app.use("/api" , cartRoute);

app.get("/test" , (_req: Request, res: Response) => {
    res.status(200).json("Server is Running")
})

runProdCosunmer(consumer).then(() => console.log("Consumer connnected")).catch((e) => console.log("consumer cant connect due to", e));
runPaymentCosunmer(paymentConsumer).then(() => console.log("Payment Consumer connected")).catch((e) => console.log("Consumer cant connect", e));
producer.connect().then(() => console.log("Order prod connnected")).catch((e) => console.log("prod cant connect due to", e));


app.listen(+process.env.HTTP_PORT! , () => {
    console.log("Servier is listening on port ", +process.env.HTTP_PORT!)
})
