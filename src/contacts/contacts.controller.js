import { Router } from "express";
import {listContacts,getContactById} from "./contacts.model.js";

import Joi from "joi";

const controller = Router();
// console.log("controller",controller);

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


  
export const contactsController = controller;
