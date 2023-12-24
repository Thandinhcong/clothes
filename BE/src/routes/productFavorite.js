import express from "express";
import { authenticate } from "../middleware/authenticate";
import { createFavoriteProduct, getFavoriteProducts, listAllProductFavorite, removeFavoriteProduct } from "../controller/products/productFavorite";

const routerProductFavorite = express.Router();

routerProductFavorite.get("/productFavorites", listAllProductFavorite);
routerProductFavorite.get("/productFavorite/:id", getFavoriteProducts);
routerProductFavorite.post("/productFavorite/add", authenticate, createFavoriteProduct);
routerProductFavorite.delete("/productFavorite/delete/:id", removeFavoriteProduct);


export default routerProductFavorite;