import express from "express";
import { addCategory, listAllCategory, listAllDelete, removeCategory, removeForce, restoreCategory } from "../controller/category/categories";
import { authenticate } from "../middleware/authenticate";
import { authorization } from "../middleware/authoraization";

const routerCategorys = express.Router();

routerCategorys.get("/categorys", listAllCategory);
routerCategorys.get("/categorys/delete", listAllDelete); // danh mục đã xóa
routerCategorys.delete("/categorys/force/:id", authenticate, authorization, removeForce); // xóacứng
routerCategorys.patch("/category/restore/:id", authenticate, authorization, restoreCategory); // khôi phục
routerCategorys.delete("/categorys/delete/:id", authenticate, authorization, removeCategory); // xóa mềm
routerCategorys.post("/categorys/add", authenticate, authorization, addCategory);

export default routerCategorys;