const express = require("express")
const userRouter = express.Router()
const Checking = require("../middleware/Checking")
const User = require("../models/userData")

userRouter.get("/profile",Checking,async(req,res)=>{
    try{
        const id = req.user._id
        const user = await User.findById(id)
        console.log(user)
        res.json({
            firstName:user.firstName,
            lastName:user.lastName,
            email:user.email,
            savedAddress:user.savedAddress,
            gender:user.gender
        })
    }
    catch(err){
        res.status(400).send("Error : "+err.message)
    }
})

userRouter.patch("/EditProfile", Checking, async (req, res) => {

    try {

        const userId = req.user._id;

        const { firstName, lastName, savedAddress, gender } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                firstName,  
                lastName,
                savedAddress,
                gender
            },
            {
                new: true,
                runValidators: true
            }
        );

        res.json(updatedUser);

    }
    catch (err) {

        res.status(400).json({
            error: err.message
        });

    }
});


module.exports = userRouter