const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const JWT_SECRET_KEY="nilesh"

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});


// json web token
userSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
       
      },
      JWT_SECRET_KEY,
      
    );
  } catch (error) {
    console.error(error);
  }
};

// define the model or the collection name
const User = new mongoose.model("User", userSchema);
module.exports = User;