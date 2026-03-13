const express = require("express");
const adminRouter = express.Router();

const Restaurant = require("../models/restroInfo");
const ResMenu = require("../models/resMenu");
const User = require("../models/userData");
const Order = require("../models/orderInfo");

const Checking = require("../middleware/Checking");
const isAdmin = require("../middleware/isAdmin");

adminRouter.get("/showAllUsers", Checking, isAdmin, async (req, res) => {
  try {
    const users = await User.find({ role: "user" });

    res.json({
      success: true,
      data: users
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

adminRouter.get("/showAllRestroOwners", Checking, isAdmin, async (req, res) => {
  try {
    const owners = await User.find({ role: "owner" });

    res.json({
      success: true,
      data: owners
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

adminRouter.get("/allPendingRestro", Checking, isAdmin, async (req, res) => {
  try {
    const menus = await ResMenu.find({ isApproved: false });

    const result = await Promise.all(
      menus.map(async (menu) => {
        const restaurant = await Restaurant.findOne({ id: Number(menu.resId) });
        if (!restaurant) return null;

        const owner = await User.findOne({ email: restaurant.RestroOwner });

        return { restaurant, menu, owner };
      })
    );

    res.json({
      success: true,
      data: result.filter(Boolean)
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

adminRouter.get("/allApprovedRestro", Checking, isAdmin, async (req, res) => {
  try {
    const menus = await ResMenu.find({ isApproved: true });

    const result = await Promise.all(
      menus.map(async (menu) => {
        const restaurant = await Restaurant.findOne({ id: Number(menu.resId) });
        if (!restaurant) return null;

        const owner = await User.findOne({ email: restaurant.RestroOwner });

        return { restaurant, menu, owner };
      })
    );

    res.json({
      success: true,
      data: result.filter(Boolean)
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

adminRouter.get("/restro/:resId", Checking, isAdmin, async (req, res) => {
  try {
    const resId = Number(req.params.resId);

    const restaurant = await Restaurant.findOne({ id: resId });
    const menu = await ResMenu.findOne({ resId: String(resId) });

    if (!restaurant || !menu) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found"
      });
    }

    const owner = await User.findOne({ email: restaurant.RestroOwner });

    res.json({
      success: true,
      data: { restaurant, menu, owner }
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

adminRouter.patch("/approveRestro", Checking, isAdmin, async (req, res) => {
  try {
    const { resId } = req.body;

    if (!resId) {
      return res.status(400).json({
        success: false,
        message: "resId required"
      });
    }

    const id = Number(resId);

    const updatedRestaurant = await Restaurant.findOneAndUpdate(
      { id: id },
      { isApproved: true },
      { new: true }
    );

    const updatedMenu = await ResMenu.findOneAndUpdate(
      { resId: String(id) },
      { isApproved: true, status: "approved" },
      { new: true }
    );

    if (!updatedRestaurant || !updatedMenu) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found"
      });
    }

    res.json({
      success: true,
      message: "Restaurant Approved",
      data: { updatedRestaurant, updatedMenu }
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

adminRouter.patch("/rejectRestro", Checking, isAdmin, async (req, res) => {
  try {
    const { resId } = req.body;

    if (!resId) {
      return res.status(400).json({
        success: false,
        message: "resId required"
      });
    }

    const id = Number(resId);

    const updatedRestaurant = await Restaurant.findOneAndUpdate(
      { id: id },
      { isApproved: false },
      { new: true }
    );

    const updatedMenu = await ResMenu.findOneAndUpdate(
      { resId: String(id) },
      { isApproved: false, status: "rejected" },
      { new: true }
    );

    if (!updatedRestaurant || !updatedMenu) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found"
      });
    }

    res.json({
      success: true,
      message: "Restaurant Rejected",
      data: { updatedRestaurant, updatedMenu }
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

adminRouter.delete("/deleteUser", Checking, isAdmin, async (req, res) => {
  try {
    const { user_id } = req.body;

    if (!user_id) {
      return res.status(400).json({
        success: false,
        message: "user_id required"
      });
    }

    const deleted = await User.findByIdAndDelete(user_id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.json({
      success: true,
      message: "User deleted"
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

adminRouter.delete("/deleteOwnerAndRestro", Checking, isAdmin, async (req, res) => {
  try {
    const { resId } = req.body;

    if (!resId) {
      return res.status(400).json({
        success: false,
        message: "resId required"
      });
    }

    const id = Number(resId);

    const restaurant = await Restaurant.findOne({ id: id });

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found"
      });
    }

    const owner = await User.findOne({ email: restaurant.RestroOwner });

    await Restaurant.deleteOne({ id: id });
    await ResMenu.deleteOne({ resId: String(id) });

    if (owner) {
      await User.deleteOne({ _id: owner._id });
    }

    res.json({
      success: true,
      message: "Owner and restaurant deleted"
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

adminRouter.get("/dashboardStats", Checking, isAdmin, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: "user" });
    const totalOwners = await User.countDocuments({ role: "owner" });
    const pendingRestros = await ResMenu.countDocuments({ isApproved: false });
    const approvedRestros = await ResMenu.countDocuments({ isApproved: true });

    res.json({
      success: true,
      data: {
        totalUsers,
        totalOwners,
        pendingRestros,
        approvedRestros
      }
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

adminRouter.get("/searchUsers", Checking, isAdmin, async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({
        success: false,
        message: "query required"
      });
    }

    const users = await User.find({
      $or: [
        { firstName: { $regex: query, $options: "i" } },
        { lastName: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } }
      ]
    });

    res.json({
      success: true,
      data: users
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

adminRouter.get("/topSalesRestros", Checking, isAdmin, async (req, res) => {
  try {
    const topRestros = await Order.aggregate([
      {
        $match: {
          status: "Completed"
        }
      },
      {
        $group: {
          _id: "$resId",
          totalSales: { $sum: "$qty" },
          revenue: { $sum: "$totalAmount" }
        }
      },
      {
        $sort: { revenue: -1 }
      },
      {
        $limit: 5
      },
      {
        $addFields: {
          resIdNum: { $toInt: "$_id" }
        }
      },
      {
        $lookup: {
          from: "feed",
          localField: "resIdNum",
          foreignField: "id",
          as: "restaurant"
        }
      },
      {
        $unwind: "$restaurant"
      },
      {
        $match: {
          "restaurant.isApproved": true
        }
      },
      {
        $project: {
          _id: 0,
          resId: "$_id",
          RestroName: "$restaurant.RestroName",
          cuisine: "$restaurant.cuisine",
          imageUrl: "$restaurant.imageUrl",
          totalSales: 1,
          revenue: 1
        }
      }
    ]);

    res.json({
      success: true,
      data: topRestros
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

module.exports = adminRouter;