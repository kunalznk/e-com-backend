require("dotenv").config()
import express, { Request, Response } from "express"
import cors from "cors"

import userRoute from "./routes/userRoutes";
import { runAuthCosunmer } from "./consumer/auth";
import { consumer } from "./config/kafka";
import mongo from "./config/db";

const app = express();

app.use(cors({
    origin:"*"
}))

mongo

app.use(express.json());
app.use("/api" , userRoute);

app.get("/test" , (_req: Request, res: Response) => {
    res.status(200).json("Server is Running")
})

runAuthCosunmer(consumer).then(() => console.log("Consumer Connected")).catch((e) => {
    console.log("Cosumer cant connect")
});

app.listen(+process.env.HTTP_PORT! , () => {
    console.log("Servier is listening on port ", +process.env.HTTP_PORT!)
})
