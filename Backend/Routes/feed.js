const express = require("express");
const feedRouter = express.Router()
const Restaurant = require("../models/restroInfo")
const ResMenu = require("../models/resMenu")
const Checking = require("../middleware/Checking")

feedRouter.get("/feed", async(req,res)=>{
    try{
        res.send(await Restaurant.find({ isApproved:true }))
    }
    catch(err){
        res.status(400).send("Error : "+err.message)
    }
})

feedRouter.get("/resInfo",async (req, res) => {
    try {
        const id = Number(req.query.id)
        const restro = await ResMenu.findOne({ "resId": id })

        if (!restro) {
            return res.status(404).send("Restaurant not found")
        }

        res.status(200).send(restro)
    } catch (err) {
        res.status(400).send("Error: " + err.message)
    }
})


module.exports = feedRouter