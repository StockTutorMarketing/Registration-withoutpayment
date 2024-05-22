import express from "express"
import router from "./routes/registerUserroute.js";
import cors from "cors"
import dotenv from "dotenv"
dotenv.config({path:"/config/config.env"})

const app=express();
app.use(express.json())
app.use(cors())



app.use("/api/v1",router);

export default app;