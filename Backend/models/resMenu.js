const mongoose = require("mongoose");

const ResMenu = new mongoose.Schema({
    resId: {
        type: String,
        required: true
    },
    name:{
        type:String,
        required: true
    },
    cuisine:{
        type:String,
        required: true
    },
    rating:{
        type:Number,
        required: true
    },
    isApproved: {
        type: Boolean,
        default: false
    },
    costForTwo:{
        type:Number,
        required: true
    },
    imageUrl:{
        type:String,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending"
    },
    categories:[
        {   
            title: {
                type: String,
                required: true
            },
            items: [
                {
                    name: {
                        type: String,
                        required: true
                    },
                    price: {
                        type: Number,
                        required: true
                    },
                    description: {
                        type: String,
                        required: true
                    },
                    imageUrl: {
                        type: String,
                        required: true
                    },
                    stock: { type: Number, required: true }
                }
            ]
        }
    ]
})

module.exports = mongoose.model("restros", ResMenu, "restros");
