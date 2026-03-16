require("dotenv").config();
const ConnectDB = require("../config/dbConnect");
const express = require("express");
const userAuth = require("../Routes/auth");
const userRouter = require("../Routes/userProfileData");
const feedRouter = require("../Routes/feed");
const cookieParser = require("cookie-parser");
const orderRouter = require("../Routes/order");
const ownerRouter = require("../Routes/owner")
const adminRouter = require("../Routes/admin")
const cors = require("cors");
const GenaiRouter = require("../Routes/Genai");
const paymentRouter = require("../Routes/payment");
const passport = require("../config/passport");
const app = express();
const CLIENT_URL=process.env.CLIENT_URL

app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: [
    "http://localhost:1234",
    "https://foodyfly.vercel.app"
  ],
  credentials: true
}));

app.options("*", cors());

app.use(passport.initialize());
app.use("/", userAuth);
app.use("/", feedRouter);
app.use("/", orderRouter);
app.use("/", userRouter);
app.use("/api/payment", paymentRouter);
app.use("/api", GenaiRouter);
app.use("/owner",ownerRouter)
app.use("/admin",adminRouter)


ConnectDB()
.then(() => {

    console.log("Connected to DataBase");

    app.listen(7777, () => {
        console.log("Listening On the Port 7777");
    });

})
.catch((err) => {

    console.log("Can Not Connect To DataBase", err);

});
