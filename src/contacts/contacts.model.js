import Joi from "joi";
import objectId from "joi-objectid";
import mongoose from "mongoose";
import { composeContacts } from "./contacts.serializer.js";
const { Schema,Types } = mongoose;

const contactsSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  subscription: { type: String, required: true },
password: { type: String, required: true },
token: { type: String, required: false, default: ""}
});
const contactsModel = mongoose.model("Contact", contactsSchema);

Joi.objectId = objectId(Joi);

const createContactsSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  subscription: Joi.string().required(),
password: Joi.string().required(),
token: Joi.string()
});
const updateContactsSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string(),
  subscription: Joi.string(),
  password: Joi.string(),
  token: Joi.string()
}).min(1);

const contactsIdSchema = Joi.object({
  id: Joi.objectId(),
});

async function listContacts(req, res) {
  try {
    const contactsContent = await contactsModel.find();
    return res.status(200).send(composeContacts(contactsContent))
  } catch (error) {
    console.error("there was an error:", error.message);

  }
}

async function getContactById(req, res) {
  try {
     const {id} = req.params;
    const contactById = await contactsModel.findOne({_id:id})
    return contactById ? res.status(200).send(composeContacts(contactById)) : res.status(404).send({ message: "Not found" });
  } catch (error) {
    console.error("there was an error:", error.message);
    
  }
}

async function removeContact(req, res) {
    try {
      const {id} = req.params;
      const contact = await contactsModel.deleteOne({ _id:new Types.ObjectId(id) });
      return contact? res.status(200).send({ message: "contact deleted" }) : res.status(404).send({ message: "Not found" });
    } catch (error) {
      console.error("there was an error:", error.message);
    }
  }

  async function addContact(req,res) {
  try {
    const newContact = await contactsModel.create(req.body)
    return res.status(201).send(composeContacts(newContact));
  } catch (error) {
    console.error("there was an error:", error.message);
  }
}

async function updateContact(req, res) {
    try {

        const { id } = req.params;
        const contact = await contactsModel.findByIdAndUpdate(id,{ $set: req.body },{ new: true });
        return contact? res.status(200).send(composeContacts(contact)):res.status(404).send({ message: "Not found" })
  
    } catch (error) {
        console.error("there was an error:", error.message);
    }
  }

export { listContacts,getContactById,removeContact,addContact,updateContact,createContactsSchema,updateContactsSchema,contactsIdSchema}

