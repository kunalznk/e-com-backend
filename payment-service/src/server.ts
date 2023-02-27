require("dotenv").config()
import express, { Request, Response } from "express"
import cors from "cors"

import mongo from "./config/db"
import paymentRoute from "./routes/paymentRoute"
import { runOrderCosunmer } from "./consumer/order";
import { consumer, producer } from "./config/kafka";


const app = express();

app.use(cors({
    origin:"*"
}))

mongo

app.use(express.json());
app.use("/api" , paymentRoute);

app.get("/test" , (_req: Request, res: Response) => {
    res.status(200).json("Server is Running")
})

runOrderCosunmer(consumer).then(() => console.log("Order Consumer connected")).catch((e) => console.log("Consumer cant connect", e));
producer.connect().then(() => console.log("Payment Producer connected")).catch((e) => console.log("Producer cant connect", e));


app.listen(+process.env.HTTP_PORT! , () => {
    console.log("Servier is listening on port ", +process.env.HTTP_PORT!)
})
