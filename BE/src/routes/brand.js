import express from "express";
import { createBrand, listAllBrand, listOneBrand } from "../controller/brand/brands";
import { authenticate } from "../middleware/authenticate";
import { authorization } from "../middleware/authoraization";

const routerBrand = express.Router();
routerBrand.get("/brands", listAllBrand);
routerBrand.get("/brand/:id", listOneBrand);
routerBrand.post("/brand/add", authenticate, authorization, createBrand);

export default routerBrand;