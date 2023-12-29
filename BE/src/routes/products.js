import express from "express";
import { ListAllProducts, createProduct, getOneProduct, listAllDelete, removeForce, removeProduct, restoreProduct, updateProduct, viewProduct } from "../controller/products/products";
import { authenticate } from "../middleware/authenticate";
import { authorization } from "../middleware/authoraization";

const routerProduct = express.Router();

routerProduct.get("/products", ListAllProducts);
routerProduct.get("/products/list-remove", authenticate, authorization, listAllDelete); // danh sách sản phẩm đã xóa
routerProduct.get("/product/:id", getOneProduct);
routerProduct.post("/product/add", authenticate, authorization, createProduct);//add
routerProduct.put("/product/update/:id", authenticate, authorization, updateProduct);//update
routerProduct.delete("/product/delete/:id", authenticate, authorization, removeProduct); // xóa mềm
routerProduct.delete("/product/remove/:id", authenticate, authorization, removeForce); // xóa vĩnh viễn
routerProduct.patch("/product/restore/:id", authenticate, authorization, restoreProduct); // khôi phục sản phẩm
routerProduct.get("/products/views/:id", viewProduct);
export default routerProduct;