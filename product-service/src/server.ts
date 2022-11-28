require("dotenv").config()
import express, { Request, Response } from "express"
import cors from "cors"

import productRoute from "./routes/productRoutes";
import mongo from "./config/db"
import { runUserCosunmer } from "./consumer/user";
import { consumer } from "./config/kafka";

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

runUserCosunmer(consumer).then(() => console.log("Consumer connected")).catch((e) => console.log("Consumer cant connect", e));

app.listen(+process.env.HTTP_PORT! , () => {
    console.log("Servier is listening on port ", +process.env.HTTP_PORT!)
})
