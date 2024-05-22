import mongoose from "mongoose"


export const ConnectToDataBase=()=>{
    mongoose.connect(process.env.Dburl).then((e)=>{
        console.log(`Database connected ${e.connection.host}`)
    }).catch((error)=>{
        console.log(error.message);
    })
}

