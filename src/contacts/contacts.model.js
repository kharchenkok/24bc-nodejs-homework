import fs from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { getPaths } from "../helpers/utils.js";

const {__dirname}=getPaths(import.meta.url)
const contactsPath = path.join(__dirname, "../db/contacts.json");

async function listContacts(req, res) {
  try {
    const contactsContent = await fs.readFile(contactsPath,"utf-8");
    const parseContactsContent = JSON.parse(contactsContent)
    return res.status(200).send(parseContactsContent)
  } catch (error) {
    console.error("there was an error:", error.message);

  }
}

async function getContactById(req, res) {
  try {
    const contactsData = await fs.readFile(contactsPath, "utf-8");
    const {id} = req.params;
    const parsedContactsData = JSON.parse(contactsData)
  
    const contactById = parsedContactsData.find(
      (contact) => contact.id == id
    );
    return contactById ? res.status(200).send(contactById) : res.status(404).send({ message: "Not found" });
  } catch (error) {
    console.error("there was an error:", error.message);
    
  }
}

async function removeContact(req, res) {
    try {
      const contactsData = await fs.readFile(contactsPath, "utf-8");
      const {id} = req.params;
      const parsedContactsData = JSON.parse(contactsData)
      const contact = parsedContactsData.find((cont) => cont.id == id);
      if(contact){
          const removedContactData = parsedContactsData.filter((cont) => cont.id != id);
          await fs.writeFile(contactsPath, JSON.stringify(removedContactData));
          return res.status(200).send({ message: "contact deleted" });;
      }
      return res.status(404).send({ message: "Not found" });
    } catch (error) {
      console.error("there was an error:", error.message);
    }
  }

  async function addContact(req,res) {
  try {
    const contactsData = await fs.readFile(contactsPath, "utf-8");
    const id = uuidv4();
    const parsedContactsData = JSON.parse(contactsData)
    const newContact = { id, ...req.body};
    const newContactsData = [...parsedContactsData, newContact];
    await fs.writeFile(contactsPath, JSON.stringify(newContactsData,null,2),"utf-8");
    return res.status(201).send(newContactsData);
  } catch (error) {
    console.error("there was an error:", error.message);
  }
}

async function updateContact(req, res) {
    try {
        const contactsData = await fs.readFile(contactsPath, "utf-8");
        const parsedContactsData = JSON.parse(contactsData)
        const { id } = req.params;
        const contact = parsedContactsData.find((cont) => cont.id == id);
  
      if (contact) {
        const updateContactsData = parsedContactsData.map((cont) =>
          cont.id == id ? { ...cont, ...req.body } : cont
        );
        fs.writeFile(contactsPath,JSON.stringify(updateContactsData, null, 2),"utf-8");
        return res.status(200).send(updateContactsData.find((cont) => cont.id == id));
      }
      return res.status(404).send({ message: "Not found" });
    } catch (error) {
        console.error("there was an error:", error.message);
    }
  }

export { listContacts, getContactById,removeContact, addContact,updateContact}
