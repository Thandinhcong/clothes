import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import session from 'express-session'
import passport from "passport";
import routerAuths from "./routes/auths";
import routerCategorys from "./routes/categoys";
import routerProduct from "./routes/products";
import routerBrand from "./routes/brand";
import routerPassport from "./routes/passport";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(session({
    secret: 'emchaoanh',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        maxAge: 30 * 60 * 1000
    }
}))
app.use(passport.initialize());
app.use(passport.session());

app.use("/api", routerBrand);
app.use("/api", routerCategorys);
app.use("/api", routerProduct);
app.use("/api", routerAuths);
app.use("/api", routerPassport);

mongoose.connect(process.env.MONGO_URL);
export const viteNodeApp = app;

