import express from "express"

import authRoute from "./routes/authRoutes";
import sequelize from "./config/db";
const app = express();

sequelize.sync();

app.use(express.json());
app.use("/api" , authRoute);
app.listen(+process.env.HTTP_PORT! , () => {
    console.log("Servier is listening on port ", +process.env.HTTP_PORT!)
})