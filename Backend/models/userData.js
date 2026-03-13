const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({

    firstName: { 
        type: String, 
        required: true,
        trim: true
    },

    lastName : {
        type: String,
        trim: true
    },

    email: { 
        type: String, 
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is Not in Valid Format");
            }
        }
    },

    password: { 
        type: String,
        validate(value){
            if(value && !validator.isStrongPassword(value)){
                throw new Error("Password is Not Strong");
            }
        }
    },

    googleId:{
        type:String
    },

    avatar:{
        type:String
    },

    gender:{
        type:String,
        enum:["male","female","others","Male","Female","Others"]
    },

    savedAddress: { 
        type: String,
        trim: true,
        default: ""   
    },

    razorpayCustomerId:{
        type:String
    },

    role: {
        type: String,
        enum: ["user", "owner", "admin"],
        default: "user"
    }

}, { timestamps: true });

const User = mongoose.model("User", userSchema);

module.exports = User;