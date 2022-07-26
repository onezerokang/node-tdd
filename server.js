const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const productRouter = require("./routers/product");

dotenv.config();
const app = express();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.use("/api/products", productRouter);

app.listen(process.env.PORT, () => {
  console.log(`Running on port ${process.env.PORT}`);
});
