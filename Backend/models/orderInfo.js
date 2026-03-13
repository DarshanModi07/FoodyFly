const mongoose = require("mongoose");

const OrderInfo = new mongoose.Schema({

  resId: {
    type: String,
    required: true
  },

  consumerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },

  items: {
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
    category: {
      type: String,
      required: true
    }
  },

  qty: {
    type: Number,
    default: 1
  },

  subtotal: {
    type: Number,
    required: true
  },

  gst: {
    type: Number,
    default: 0
  },

  deliveryCharge: {
    type: Number,
    default: 0
  },

  totalAmount: {
    type: Number,
    required: true
  },

  status: {
    type: String,
    enum: ["Pending", "Confirmed", "Delivered", "Cancelled", "Completed"],
    default: "Pending"
  }

}, { timestamps: true });

module.exports = mongoose.model("Order", OrderInfo);