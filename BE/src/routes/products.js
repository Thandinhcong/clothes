import express from "express";
import { ListAllProducts, getOneProduct, listAllDelete, removeForce, removeProduct, restoreProduct } from "../controller/products/products";
import { authenticate } from "../middleware/authenticate";
import { authorization } from "../middleware/authoraization";

const routerProduct = express.Router();

routerProduct.get("/products", ListAllProducts);
routerProduct.get("/product/:id", getOneProduct);
routerProduct.delete("/product/delete/:id", authenticate, authorization, removeProduct); // xóa mềm
routerProduct.delete("/product/remove/:id", authenticate, authorization, removeForce); // xóa vĩnh viễn
routerProduct.get("/product/remove", authenticate, authorization, listAllDelete); // danh sách sản phẩm đã xóa
routerProduct.patch("/product/restore/:id", authenticate, authorization, restoreProduct); // khôi phục sản phẩm
export default routerProduct;