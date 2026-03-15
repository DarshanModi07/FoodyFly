const express = require("express");
const paymentRouter = express.Router();
const stripe = require("../utils/stripe");
const CLIENT_URL = process.env.CLIENT_URL

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

      success_url: CLIENT_URL+"/success",

      cancel_url: CLIENT_URL+"/cart"

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