const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "./db/contacts.json");

async function listContacts() {
  try {
    const contactsContent = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(contactsContent);
  } catch (error) {
    console.error("there was an error:", error.message);
  }
}

async function getContactById(contactId) {
  try {
    const contactsData = await listContacts();
    const contactById = contactsData.find(
      (contact) => contact.id === contactId
    );
    return contactById;
  } catch (error) {
    console.error("there was an error:", error.message);
  }
}

async function removeContact(contactId) {
  try {
    const contactsData = await listContacts();
    const removedContactData = contactsData.filter(
      (contact) => contact.id !== contactId
    );
    await fs.writeFile(contactsPath, JSON.stringify(removedContactData));
    return removedContactData;
  } catch (error) {
    console.error("there was an error:", error.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const contactsData = await listContacts();
    const id = uuidv4();
    const newContact = { id, name, email, phone };
    const newContactsData = [...contactsData, newContact];
    await fs.writeFile(contactsPath, JSON.stringify(newContactsData));
    return newContactsData;
  } catch (error) {
    console.error("there was an error:", error.message);
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };
