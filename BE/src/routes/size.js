import express from "express";
import { createSize, listAllSize, listOneSize, removeSize, updateSize } from "../controller/sizes/sizes";
import { authenticate } from "../middleware/authenticate";
import { authorization } from "../middleware/authoraization";

const routerSize = express.Router();

routerSize.get("/sizes", listAllSize);
routerSize.get("/size/:id", listOneSize);
routerSize.post("/size/add", authenticate, authorization, createSize);
routerSize.put("/size/update/:id", authenticate, authorization, updateSize);
routerSize.delete("/size/delete/:id", authenticate, authorization, removeSize);

export default routerSize;