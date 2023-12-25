import express from "express";
import { createColor, getAllColor, listOneColor, removeColor, updateColor } from "../controller/colors/colors";
import { authorization } from "../middleware/authoraization";

const routerColor = express.Router();

routerColor.get("/colors", getAllColor);
routerColor.get("/color/:id", listOneColor);
routerColor.delete("/color/delete/:id", removeColor);
routerColor.post("/color/add", createColor);
routerColor.put("/color/update/:id", updateColor);


export default routerColor;