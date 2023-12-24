import express from "express";
import { ListAllProducts } from "../controller/products/products";

const routerProduct = express.Router();

routerProduct.get("/products", ListAllProducts);

export default routerProduct;