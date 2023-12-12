import express from "express";
import dotenv from "dotenv";
import connectDatabase from "./config/MongoDb.js"
import ImportData from "./DataImport.js";
import productRoute from "./Router/ProductRoutes.js";
import { errorHandler, notFound } from "./Middleware/Errors.js";
import userRouter from "./Router/UserRoutes.js";
import orderRouter from "./Router/orderRoutes.js";

dotenv.config();
connectDatabase();

const app = express();
app.use(express.json());

//api
app.use("/api/import", ImportData);
app.use("/api/products",productRoute);
app.use("/api/users",userRouter);
app.use("/api/orders",orderRouter);
app.get("/api/config/paypal",(req,res)=>{
    res.send(process.env.PAYPAL_CLIENT_ID);
});

//erro
app.use(notFound);
app.use(errorHandler);


//


const PORT = process.env.PORT || 1000;

app.listen(PORT,console.log(`server running in port${PORT}`));