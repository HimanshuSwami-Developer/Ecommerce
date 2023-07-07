import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import brandRoutes from "./routes/brandRoutes.js";

import productRoutes from "./routes/productRoutes.js";
import cors from "cors";
import path from "path";
import {fileURLToPath} from 'url';

// const express= require('express');
// const colors= require('colors');
// const dotenv = require('dotenv');
// const morgan =require("morgan");
// const connectDB =require("./config/db.js")
// const authRoutes =require("./routes/authRoute.js");
// const categoryRoutes =require("./routes/categoryRoutes.js");
// const productRoutes =require("./routes/productRoutes.js");
// const cors =require("cors");
// const path=require("path");


//configure env
dotenv.config();

//databse config
connectDB();

//rest object
const app = express();

//middelwares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));


// 👇️ "/home/borislav/Desktop/javascript/index.js"
const __filename = fileURLToPath(import.meta.url);
console.log(__filename)

// 👇️ "/home/borislav/Desktop/javascript"
const __dirname = path.dirname(__filename);
console.log('directory-name 👉️', __dirname);

app.use(express.static(path.join(__dirname,"/client","build")))

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);

app.use("/api/v1/brand", brandRoutes);
app.use("/api/v1/product", productRoutes);

//rest api
app.use("*", function(req, res) {
    res.sendFile(path.join(__dirname,"/client","/build","index.html"));
});

//PORT
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
  console.log(
    `Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white
  );
});
