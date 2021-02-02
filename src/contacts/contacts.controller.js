import { Router } from "express";
import {listContacts,getContactById,removeContact,addContact,updateContact} from "./contacts.model.js";
import Joi from "joi";
import { validate } from "../helpers/validate.js";

const controller = Router();

const createContactsSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
  });
  const updateContactsSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    phone: Joi.string(),
  }).min(1);

controller.get("/", listContacts);
controller.get("/:id", getContactById);
controller.delete("/:id", removeContact);
controller.post("/", validate(createContactsSchema), addContact);
controller.patch("/:id", validate(updateContactsSchema),updateContact);

  
export const contactsController = controller;
