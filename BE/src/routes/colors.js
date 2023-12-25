import express from "express";
import { createColor, getAllColor, listOneColor, removeColor, updateColor } from "../controller/colors/colors";
import { authorization } from "../middleware/authoraization";
import { authenticate } from "passport";

const routerColor = express.Router();

routerColor.get("/colors", getAllColor);
routerColor.get("/color/:id", listOneColor);
routerColor.delete("/color/delete/:id", authenticate, authorization, removeColor);
routerColor.post("/color/add", authenticate, authorization, createColor);
routerColor.put("/color/update/:id", authenticate, authorization, updateColor);


export default routerColor;