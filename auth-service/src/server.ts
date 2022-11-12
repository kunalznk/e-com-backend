import express, { Request, Response } from "express"
import cors from "cors"

import authRoute from "./routes/authRoutes";
import sequelize from "./config/db";
const app = express();

sequelize.sync({
    force: false
});

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
