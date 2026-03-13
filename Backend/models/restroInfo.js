
const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
    
    id: { type: Number, required: true },  
    RestroName: { type: String }, 
    RestroOwner: {
      type: String,
      required: true,
      lowercase: true,
      trim: true  
    }, 
    isApproved: {
        type: Boolean,
        default: false
    },   
      keywords: [
    {
      type: String,
      lowercase: true,
      trim: true
    }
  ],  
    name: { type: String, required: true },
    cuisine: { type: String },
    rating: { type: Number, default: 0 },
    imageUrl: { type: String },
    price: { type: Number },
    promoted: { type: Boolean }
}, { timestamps: true });

module.exports = mongoose.model("feed", restaurantSchema, "feed");