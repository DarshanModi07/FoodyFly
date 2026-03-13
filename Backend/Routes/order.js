const express = require("express")
const orderRouter = express.Router()
const resMenu = require("../models/resMenu")
const order = require("../models/orderInfo")
const Checking = require("../middleware/Checking")

orderRouter.post("/orderAdd", Checking, async (req, res) => {

  try {

    const { id, categories, item } = req.body

    const restro = await resMenu.findOne({ resId: id })
    if (!restro) throw new Error("Restaurant not found")

    const cat = restro.categories.find(c => c.title === categories)
    if (!cat) throw new Error("Category not found")

    const it = cat.items.find(i => i.name === item)
    if (!it) throw new Error("Item not found")

    if (it.stock <= 0) throw new Error("Item out of stock")

    const alreadyOrdered = await order.findOne({
      resId: id,
      consumerId: req.user.id,
      "items.name": it.name,
      "items.category": categories,
      status: "Pending"
    })

    if (!alreadyOrdered) {

      const subtotal = it.price
      const gst = Math.round(subtotal * 0.05)
      const deliveryCharge = subtotal >= 499 ? 0 : 30
      const totalAmount = subtotal + gst + deliveryCharge

      const data = new order({

        resId: id,
        consumerId: req.user.id,

        items: {
          name: it.name,
          price: it.price,
          description: it.description,
          imageUrl: it.imageUrl,
          category: categories
        },

        qty: 1,
        subtotal,
        gst,
        deliveryCharge,
        totalAmount,
        status: "Pending"

      })

      const savedData = await data.save()

      return res.json({
        message: "New Order Placed",
        data: savedData
      })
    }

    const newSubtotal = alreadyOrdered.subtotal + it.price
    const gst = Math.round(newSubtotal * 0.05)
    const deliveryCharge = newSubtotal >= 499 ? 0 : 30
    const totalAmount = newSubtotal + gst + deliveryCharge

    await order.updateOne(

      { _id: alreadyOrdered._id },

      {
        $inc: { qty: 1, subtotal: it.price },
        $set: { gst, deliveryCharge, totalAmount }
      }

    )

    res.json({ message: "Order Updated" })

  } catch (err) {

    res.status(404).send("ERROR : " + err.message)

  }

})

orderRouter.post("/placeOrder", Checking, async (req, res) => {

  try {

    const result = await order.updateMany(

      {
        consumerId: req.user.id,
        status: "Pending"
      },

      {
        $set: { status: "Delivered" }
      }

    )

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "No pending orders" })
    }

    res.json({
      message: "Orders confirmed",
      updatedCount: result.modifiedCount
    })

  } catch (err) {

    res.status(500).json({ error: err.message })

  }

})

orderRouter.post("/clearOrder", Checking, async (req, res) => {

  try {

    const result = await order.deleteMany({
      consumerId: req.user.id,
      status: "Pending"
    })

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Cart empty" })
    }

    res.json({
      message: "Cart cleared",
      deletedCount: result.deletedCount
    })

  } catch (err) {

    res.status(500).json({ error: err.message })

  }

})

orderRouter.get("/allOrders", Checking, async (req, res) => {

  try {

    const placedOrders = await order.find({
      consumerId: req.user.id,
      status: "Pending"
    })

    if (placedOrders.length === 0) {

      return res.json({
        message: "Cart Empty",
        data: [],
        subtotal: 0,
        gst: 0,
        deliveryCharge: 0,
        amountToPay: 0
      })

    }

    const subtotal = placedOrders
      .map(item => item.subtotal)
      .reduce((a, b) => a + b, 0)

    const gst = Math.round(subtotal * 0.05)

    const deliveryCharge = subtotal >= 499 ? 0 : 30

    const amountToPay = subtotal + gst + deliveryCharge

    res.json({

      message: "Orders",
      data: placedOrders,
      subtotal,
      gst,
      deliveryCharge,
      amountToPay

    })

  } catch (err) {

    res.status(500).send("Error : " + err.message)

  }

})

orderRouter.post("/orderDelete", Checking, async (req, res) => {

  try {

    const { id, categories, item } = req.body

    const existingOrder = await order.findOne({
      resId: id,
      consumerId: req.user.id,
      "items.name": item,
      "items.category": categories,
      status: "Pending"
    })

    if (!existingOrder) {
      return res.status(404).json({ message: "Item not in cart" })
    }

    if (existingOrder.qty <= 1) {

      await order.deleteOne({ _id: existingOrder._id })

      return res.json({ message: "Item removed from cart" })

    }

    const newSubtotal = existingOrder.subtotal - existingOrder.items.price
    const gst = Math.round(newSubtotal * 0.05)
    const deliveryCharge = newSubtotal >= 499 ? 0 : 30
    const totalAmount = newSubtotal + gst + deliveryCharge

    await order.updateOne(

      { _id: existingOrder._id },

      {
        $inc: { qty: -1, subtotal: -existingOrder.items.price },
        $set: { gst, deliveryCharge, totalAmount }
      }

    )

    res.json({ message: "Item quantity decreased" })

  } catch (err) {

    res.status(500).json({ error: err.message })

  }

})


module.exports = orderRouter