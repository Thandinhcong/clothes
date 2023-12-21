import express from "express";
import { Signin, Signup, getInfoUser } from "../controller/auth/auths";
import { authenticate } from "../middleware/authenticate";
const routerAuths = express.Router();

routerAuths.post("/register", Signup);
routerAuths.post("/login", Signin);
routerAuths.get('/infoUser', authenticate, getInfoUser);

export default routerAuths;