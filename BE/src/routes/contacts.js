import express from "express";
import { addContact, getAllContact, getAllDeleteContact, getContactById, removeContact, removeForceContact, restoreContact, updateContact } from "../controller/contact/contact";
import { authorization } from "../middleware/authoraization";
import { authenticate } from "../middleware/authenticate";

const routerContact = express.Router();

routerContact.get("/contacts", getAllContact);
routerContact.get("/contact/:id", getContactById);
routerContact.post("/contact/add", authenticate, authorization, addContact);
routerContact.get("/contact/delete", authenticate, authorization, getAllDeleteContact); //danh sách đã xóa
routerContact.delete("/contact/force/:id", authenticate, authorization, removeForceContact);//xóa cứng
routerContact.delete("/contact/delete/:id", authenticate, authorization, removeContact);// xóa mềm
routerContact.patch("/contact/restore/:id", authenticate, authorization, restoreContact); // khôi phục
routerContact.put("/contact/update/:id", authenticate, authorization, updateContact);// cập nhật

export default routerContact;