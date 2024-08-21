const mongoose=require("mongoose")

const uri = process.env.Mongodb_uri

const connectDb=async()=>{
    try {
       await mongoose.connect(uri)
       console.log("connection successfull")
    } catch (error) {
        console.error("database connection failed")
    }
}

module.exports=connectDb