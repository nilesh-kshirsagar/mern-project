require("dotenv").config()
const express = require('express')
const app = express()
const cors = require("cors");
const port =process.env.port || 5000 
const connectDb=require("./db")
const router=require("./router/auth-router")
const User=require("./models/user-model")

app.use(cors());
//we link the router files to make our route easy 
app.use(express.json());
app.use("/api/auth",router)

connectDb()

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})