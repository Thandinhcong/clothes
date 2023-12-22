import express from "express";
import { Signin, Signup, getInfoUser } from "../controller/auth/auths";
import { authenticate } from "../middleware/authenticate";
import { updateUser } from "../controller/auth/updateUser";
import { changePassWord } from "../controller/auth/changePassword";
const routerAuths = express.Router();

routerAuths.post("/register", Signup);
routerAuths.post("/login", Signin);
routerAuths.get('/infoUser', authenticate, getInfoUser);
routerAuths.put('/updateProfile', authenticate, updateUser);
routerAuths.post('/changePassword', authenticate, changePassWord);


export default routerAuths;