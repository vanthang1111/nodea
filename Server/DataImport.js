import express from 'express';
import User from "./Models/UserModel.js";
import users from "./data/users.js";
import Product from "./Models/ProductModel.js";
import products from "./data/Products.js";
import asyncHandler from "express-async-handler";


const ImportData = express.Router();

ImportData.post("/user", asyncHandler(async (req, res) => {
  try {
    await User.deleteMany({});
    const importUser = await User.insertMany(users);
    res.send({ importUser });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
}));

ImportData.post("/products", asyncHandler(async (req, res) => {
  try {
    await Product.deleteMany({});
    const importProducts= await Product.insertMany(products);
    res.send({ importProducts });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
}));


export default ImportData;
