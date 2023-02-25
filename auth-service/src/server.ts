import express, { Request, Response } from "express"
import cookieParser  from 'cookie-parser';
import cors from "cors"

import authRoute from "./routes/authRoutes";
import sequelize from "./config/db";
import { consumer, producer } from "./config/kafka";
import { runUserCosunmer } from "./consumer/user";
const app = express();
app.use(cookieParser())
sequelize.sync({
    force: false
});

producer.connect().then(() => {
    console.log("Produce Connected")
}).catch((e) => {
    console.log("Cant connect due to" , {e})
})

runUserCosunmer(consumer).then(() => {
    console.log("Consumer Connected")
}).catch((e) => {
    console.log("Cant connect due to" , {e})
})
app.use(cors({
    origin:"*"
}))

app.use(express.json());
app.use("/api" , authRoute);

app.get("/test" , (_req: Request, res: Response) => {
    res.status(200).json("Server is Running")
})

app.listen(+process.env.HTTP_PORT! , () => {
    console.log("Servier is listening on port ", +process.env.HTTP_PORT!)
})
