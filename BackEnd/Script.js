
import { ConnectToDataBase } from "./db/Database.js";
import app from "./App.js"
import cors from "cors"
import dotenv from "dotenv"

dotenv.config({path:"/config/config.env"})


app.use(cors())

//importing dbfunction for connecting with our database
ConnectToDataBase();
app.listen(process.env.PORT|| 3000,()=>{
    console.log(`server is running http://locahost:${process.env.PORT }`)
});