import express from "express";
import { createBrand, listAllBrand, listOneBrand, removeBrand, updateBrand } from "../controller/brand/brands";
import { authenticate } from "../middleware/authenticate";
import { authorization } from "../middleware/authoraization";

const routerBrand = express.Router();
routerBrand.get("/brands", listAllBrand);
routerBrand.get("/brand/:id", listOneBrand);
routerBrand.post("/brand/add", authenticate, authorization, createBrand);
routerBrand.put("/brand/update/:id", authenticate, authorization, updateBrand);
routerBrand.delete("/brand/delete/:id", authenticate, authorization, removeBrand);
export default routerBrand;