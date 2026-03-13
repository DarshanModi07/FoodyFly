const express = require("express");
const paymentRouter = express.Router();
const stripe = require("../utils/stripe");

paymentRouter.post("/create-checkout-session", async (req, res) => {

  try {

    const { amount } = req.body;

    const session = await stripe.checkout.sessions.create({

      payment_method_types: ["card"],

      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: "FoodyFly Order"
            },
            unit_amount: amount * 100
          },
          quantity: 1
        }
      ],

      mode: "payment",

      success_url: "http://localhost:1234/success",

      cancel_url: "http://localhost:1234/cart"

    });

    res.json({
      id: session.id,
      url: session.url
    });

  } catch (err) {

    res.status(500).json({ error: err.message });

  }

});

module.exports = paymentRouter;