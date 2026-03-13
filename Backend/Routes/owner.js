const express = require("express");
const ownerRouter = express.Router();
const Restaurant = require("../models/restroInfo");
const ResMenu = require("../models/resMenu");
const Checking = require("../middleware/Checking");
const User = require("../models/userData");
const Orders = require("../models/orderInfo")

ownerRouter.get("/AlreadyHaveRestro",Checking,async(req,res)=>{
    try{
      const findOwner = await User.findById(req.user._id);

      if (!findOwner) {
        return res.status(404).json({
          success: false,
          message: "Owner not found"
        });
      }

      if (findOwner.role !== "owner") {
        return res.status(403).json({
          success: false,
          message: "Only owners can create restaurant"
        });
      }

      const existingRestaurant = await Restaurant.findOne({
        RestroOwner: findOwner.email
      });

      if (existingRestaurant) {
        return res.status(200).json({
          success: true,
          hasRestaurant: true
        });
      }
      else{
        return res.status(200).json({
          success: true,
          hasRestaurant: false
        });
      }
    } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
})

ownerRouter.post("/addRestroDetails", Checking, async (req, res) => {
  try {

    const {
      RestroName,
      name,
      cuisine,
      imageUrl,
      price,
      promoted,
      keywords,
      BannerImageUrl,
      costForTwo
    } = req.body;

    const findOwner = await User.findById(req.user._id);

    if (!findOwner) {
      return res.status(404).json({
        success: false,
        message: "Owner not found"
      });
    }

    if (findOwner.role !== "owner") {
      return res.status(403).json({
        success: false,
        message: "Only owners can create restaurant"
      });
    }

    const existingRestaurant = await Restaurant.findOne({
      RestroOwner: findOwner.email
    });

    if (existingRestaurant) {
      return res.status(400).json({
        success: false,
        message: "You already own a restaurant"
      });
    }

    const lastRestaurant = await Restaurant.findOne().sort({ id: -1 });
    const newId = lastRestaurant ? lastRestaurant.id + 1 : 1;

    const keywordArray = keywords
      ? keywords.split(",").map(k => k.trim().toLowerCase())
      : [];

    const newRestaurant = await Restaurant.create({
      id: newId,
      RestroName,
      RestroOwner: findOwner.email,
      isApproved: false,
      name,
      cuisine,
      keywords: keywordArray,
      rating: 0,
      imageUrl,
      price,
      promoted: promoted || false
    });

    const newResMenu = await ResMenu.create({
      resId: newId,
      name: RestroName,
      cuisine,
      rating: 0,
      isApproved: false,
      costForTwo,
      imageUrl: BannerImageUrl,
      categories: []
    });

    res.status(201).json({
      success: true,
      message: "Restaurant Added. Waiting for admin approval.",
      data: {
        restaurant: newRestaurant,
        menu: newResMenu
      }
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

ownerRouter.post("/addMenuItem", Checking, async (req, res) => {
  try {

    const { title, name, price, description, imageUrl, stock } = req.body;

    const findOwner = await User.findById(req.user._id);

    if (!findOwner) {
      return res.status(404).json({
        success: false,
        message: "Owner not found"
      });
    }

    if (findOwner.role !== "owner") {
      return res.status(403).json({
        success: false,
        message: "Only owners can modify menu"
      });
    }

    const restaurant = await Restaurant.findOne({
      RestroOwner: findOwner.email
    });

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found"
      });
    }

    const menu = await ResMenu.findOne({
      resId: restaurant.id
    });

    if (!menu) {
      return res.status(404).json({
        success: false,
        message: "Menu not found"
      });
    }

    let category = menu.categories.find(cat => cat.title === title);

    if (!category) {

      menu.categories.push({
        title: title,
        items: []
      });

      category = menu.categories.find(cat => cat.title === title);
    }

    category.items.push({
      name,
      price,
      description,
      imageUrl,
      stock
    });

    await menu.save();

    res.json({
      success: true,
      message: "Menu item added successfully. Waiting for admin approval.",
      data: menu
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

ownerRouter.delete("/removeMenuItem", Checking, async (req, res) => {
  try {

    const { title, itemName } = req.body;

    const findOwner = await User.findById(req.user._id);

    if (!findOwner || findOwner.role !== "owner") {
      return res.status(403).json({
        success: false,
        message: "Unauthorized"
      });
    }

    const restaurant = await Restaurant.findOne({
      RestroOwner: findOwner.email
    });

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found"
      });
    }

    const menu = await ResMenu.findOne({
      resId: restaurant.id
    });

    if (!menu) {
      return res.status(404).json({
        success: false,
        message: "Menu not found"
      });
    }

    const category = menu.categories.find(
      cat => cat.title === title
    );

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found"
      });
    }

    category.items = category.items.filter(
      item => item.name !== itemName
    );

    await menu.save();

    res.json({
      success: true,
      message: "Item removed successfully"
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

ownerRouter.delete("/closeRestro", Checking, async (req, res) => {
  try {

    const findOwner = await User.findById(req.user._id);

    if (!findOwner || findOwner.role !== "owner") {
      return res.status(403).json({
        success: false,
        message: "Unauthorized"
      });
    }

    const restaurant = await Restaurant.findOne({
      RestroOwner: findOwner.email
    });

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found"
      });
    }

    await Restaurant.deleteOne({
      RestroOwner: findOwner.email
    });

    await ResMenu.deleteOne({
      resId: restaurant.id
    });

    res.json({
      success: true,
      message: "Restaurant closed successfully"
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

ownerRouter.patch("/editRestroDetails", Checking, async (req, res) => {
  try {

    const {
      RestroName,
      name,
      cuisine,
      imageUrl,
      price,
      promoted,
      keywords,
      BannerImageUrl,
      costForTwo
    } = req.body;

    const findOwner = await User.findById(req.user._id);

    if (!findOwner || findOwner.role !== "owner") {
      return res.status(403).json({
        success: false,
        message: "Unauthorized"
      });
    }

    const restaurant = await Restaurant.findOne({
      RestroOwner: findOwner.email
    });

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found"
      });
    }

    const menu = await ResMenu.findOne({
      resId: restaurant.id
    });

    if (!menu) {
      return res.status(404).json({
        success: false,
        message: "Menu not found"
      });
    }

    const keywordArray = keywords
      ? keywords.split(",").map(k => k.trim().toLowerCase())
      : restaurant.keywords;

    await Restaurant.findOneAndUpdate(
      { RestroOwner: findOwner.email },
      {
        RestroName,
        name,
        cuisine,
        keywords: keywordArray,
        imageUrl,
        price,
        promoted: promoted || false,
      }
    );

    await ResMenu.findOneAndUpdate(
      { resId: restaurant.id },
      {
        name: RestroName,
        cuisine,
        costForTwo,
        imageUrl: BannerImageUrl,
      }
    );

    res.json({
      success: true,
      message: "Restaurant details updated."
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

ownerRouter.get("/myRestaurant", Checking, async (req, res) => {
  try {

    const owner = await User.findById(req.user._id);

    if (!owner || owner.role !== "owner") {
      return res.status(403).json({
        success: false,
        message: "Unauthorized"
      });
    }

    const restaurant = await Restaurant.findOne({
      RestroOwner: owner.email
    });

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "No restaurant found"
      });
    }

    const menu = await ResMenu.findOne({
      resId: restaurant.id
    });

    if (!menu) {
      return res.status(404).json({
        success: false,
        message: "Menu not found"
      });
    }

    res.json({
      success: true,
      data: {
        restaurant,
        menu
      }
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

ownerRouter.patch("/editMenuItem", Checking, async (req, res) => {
  try {

    const { title, oldItemName, name, price, description, imageUrl, stock } = req.body;

    if (!title || !oldItemName) {
      return res.status(400).json({
        success: false,
        message: "Category title and oldItemName are required"
      });
    }

    const owner = await User.findById(req.user._id);

    if (!owner || owner.role !== "owner") {
      return res.status(403).json({
        success: false,
        message: "Unauthorized"
      });
    }

    const restaurant = await Restaurant.findOne({
      RestroOwner: owner.email
    });

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found"
      });
    }

    const menu = await ResMenu.findOne({
      resId: restaurant.id
    });

    if (!menu) {
      return res.status(404).json({
        success: false,
        message: "Menu not found"
      });
    }

    const category = menu.categories.find(cat => cat.title === title);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found"
      });
    }

    const item = category.items.find(i => i.name === oldItemName);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found"
      });
    }

    if (name !== undefined) item.name = name;
    if (price !== undefined) item.price = price;
    if (description !== undefined) item.description = description;
    if (imageUrl !== undefined) item.imageUrl = imageUrl;
    if (stock !== undefined) item.stock = stock;

    await menu.save();

    res.json({
      success: true,
      message: "Menu item updated successfully. Waiting for admin approval.",
      data: item
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

ownerRouter.get("/pandingOrder", Checking, async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne({ RestroOwner: req.user.email });

    if (!restaurant) {
      return res.json({ message: "Restaurant not Found" });
    }

    const orders = await Orders.find({ resId: String(restaurant.id) , status : "Completed"});

    const ans = [];

    for (const order of orders) {
        const findUser = await User.findById(order.consumerId).select("firstName lastName email");
        
        if (!findUser) continue; 

        ans.push({ userData: findUser, order: order });
    }

    if (orders.length === 0) {
      return res.json({ message: "There are No Pending Orders" });
    }

    res.json({ message: "Data of Res", Orders: ans });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

ownerRouter.patch("/orderDelivered", Checking, async (req, res) => {
  try {
    const { orderId } = req.body;

    const restaurant = await Restaurant.findOne({ RestroOwner: req.user.email });

    if (!restaurant) {
      return res.json({ message: "Restaurant not Found" });
    }

    const updated = await Orders.findOneAndUpdate(
      { _id: orderId, resId: String(restaurant.id) },
      { status: "Delivered" },
      { new: true }
    );

    if (!updated) {
      return res.json({ message: "Order not Found" });
    }

    res.json({ message: "Order Delivered", Data: updated });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = ownerRouter;