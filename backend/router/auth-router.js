const express = require('express');
const User = require('../models/user-model');
const Contact = require('../models/contact-model');
const router = express.Router();

router.get('/', (req, res) => {
    res.send("hello this is home page");
});
  
router.post('/register',async (req, res) => {
    try {
        const {username, email, phone, password}= req.body
        const userExist =await User.findOne({email})

        if(userExist){
            return res.status(400).json({msg:"email already exist"})
        }
       const userCreated= await User.create({username,email,phone,password})

       res.status(201).json({message:"registration successfull",token:await userCreated.generateToken()}); 
    } catch (error) {
        res.status(500).json("internal server error")
    }
});

router.post('/login',async (req, res) => {
    try {
        const { email, password}= req.body
        const userExist =await User.findOne({email})

        if(!userExist){
            return res.status(400).json({msg:"invalid credentials"})
        }
       
       else if(password==userExist.password){
        res.status(200).json({message:"login successfull",token:await userExist.generateToken()}); 
       }
       else{
          res.status(401).json({message:"invalid email or password"})
       }

    } catch (error) {
        res.status(500).json("internal server error")
    }
});

router.post('/contact', async(req, res) => {
    try {
        const response=req.body
        await Contact.create(response)
        return res.status(200).json({message:"message send successfully"})
    } catch (error) {
        res.status(500).json({message:"message not delivered"})
    }
  })

module.exports = router;