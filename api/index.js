const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv")

dotenv.config()

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
