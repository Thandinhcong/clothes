import express from "express";
import { authenticate } from "../middleware/authenticate";
import { createFavoriteProduct, getFavoriteProducts, listAllProductFavorite, removeFavoriteProduct } from "../controller/products/productFavorite";

const routerProductFavorite = express.Router();

routerProductFavorite.get("/productFavorites", getFavoriteProducts);
routerProductFavorite.get("/productFavorite/:id", listAllProductFavorite);
routerProductFavorite.post("/productFavorite/add/:id", authenticate, createFavoriteProduct);
routerProductFavorite.delete("/productFavorite/delete/:id", removeFavoriteProduct);


export default routerProductFavorite;