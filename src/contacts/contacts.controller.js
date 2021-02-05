import { Router } from "express";
import {listContacts,getContactById,removeContact,addContact,updateContact,createContactsSchema,updateContactsSchema,contactsIdSchema} from "./contacts.model.js";
import { validate } from "../helpers/validate.js";

const controller = Router();

controller.get("/", listContacts);
controller.get("/:id", validate(contactsIdSchema),getContactById);
controller.delete("/:id", removeContact);
controller.post("/", validate(createContactsSchema), addContact);
controller.patch("/:id", validate(updateContactsSchema),updateContact);

  
export const contactsController = controller;
