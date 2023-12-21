import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import routerAuths from "./routes/auths";


dotenv.config();
const app = express();
app.use(express.json());

app.use("/api", routerAuths);
mongoose.connect("mongodb://127.0.0.1:27017/clothes");
export const viteNodeApp = app;

