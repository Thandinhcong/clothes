import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import routerAuths from "./routes/auths";
import routerCategorys from "./routes/categoys";
import routerProduct from "./routes/products";
import routerBrand from "./routes/brand";
dotenv.config();


const app = express();
app.use(express.json());
app.use(cors());


app.use("/api", routerBrand);
app.use("/api", routerCategorys);
app.use("/api", routerProduct);
app.use("/api", routerAuths);
mongoose.connect("mongodb://127.0.0.1:27017/clothes");
export const viteNodeApp = app;

