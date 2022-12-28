const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv")
dotenv.config()
const userRoute = require("./routes/user")
const authRoute = require('./routes/auth')
const productRoute = require('./routes/product')
const cartRoute = require('./routes/cart')
const orderRoute = require('./routes/order')
const stripeRoute = require('./routes/stripe')



app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Token");
  next();
});

app.use(express.json())
app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)
app.use("/api/products", productRoute)
app.use("/api/carts", cartRoute)
app.use("/api/orders", orderRoute)
app.use("/api/stripe", stripeRoute)


mongoose
  .connect(
    process.env.MONGO_URL
  )
  .then(() => console.log("DBConnection Successfull!"))
  .catch((e) => {
    console.log(e);
  });

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running!");
});
