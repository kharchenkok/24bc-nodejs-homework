import fs from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { getPaths } from "../helpers/utils.js";

const {__dirname}=getPaths(import.meta.url)
console.log("__dirname",__dirname);
// const contactsPath = path.join(__dirname, "../db/contacts.json").slice(3);
const contactsPath = path.join(__dirname, "../db/contacts.json");


console.log("contactsPath",contactsPath);



async function listContacts(req, res) {
  try {
    const contactsContent = await fs.readFile(contactsPath,"utf-8");
    // const contactsContent = '[{"id":1,"name":"Allen Raymond","email":"nulla.ante@vestibul.co.uk","phone":"(992) 914-3792"},{"id":2,"name":"Chaim Lewis","email":"dui.in@egetlacus.ca","phone":"(294) 840-6685"},{"id":4,"name":"Wylie Pope","email":"est@utquamvel.net","phone":"(692) 802-2949"},{"id":5,"name":"Cyrus Jackson","email":"nibh@semsempererat.com","phone":"(501) 472-5218"},{"id":6,"name":"Abbot Franks","email":"scelerisque@magnis.org","phone":"(186) 568-3720"},{"id":7,"name":"Reuben Henry","email":"pharetra.ut@dictum.co.uk","phone":"(715) 598-5792"},{"id":8,"name":"Simon Morton","email":"dui.Fusce.diam@Donec.com","phone":"(233) 738-2360"},{"id":9,"name":"Thomas Lucas","email":"nec@Nulla.com","phone":"(704) 398-7993"},{"id":10,"name":"Alec Howard","email":"Donec.elementum@scelerisquescelerisquedui.net","phone":"(748) 206-2688"},{"id":"6a31f94f-6d28-493f-b7ba-6604bb6fe6c9","name":"Mango","email":"mango@gmail.com","phone":"322-22-22"}]';
    const parseContactsContent = JSON.parse(contactsContent)
    return res.status(200).send(parseContactsContent)
  } catch (error) {
    console.error("there was an error:", error.message);

  }
}

async function getContactById(req, res) {
  try {
    // const contactsData = await fs.readFile(contactsPath, "utf-8");
    const contactsData = '[{"id":1,"name":"Allen Raymond","email":"nulla.ante@vestibul.co.uk","phone":"(992) 914-3792"},{"id":2,"name":"Chaim Lewis","email":"dui.in@egetlacus.ca","phone":"(294) 840-6685"},{"id":4,"name":"Wylie Pope","email":"est@utquamvel.net","phone":"(692) 802-2949"},{"id":5,"name":"Cyrus Jackson","email":"nibh@semsempererat.com","phone":"(501) 472-5218"},{"id":6,"name":"Abbot Franks","email":"scelerisque@magnis.org","phone":"(186) 568-3720"},{"id":7,"name":"Reuben Henry","email":"pharetra.ut@dictum.co.uk","phone":"(715) 598-5792"},{"id":8,"name":"Simon Morton","email":"dui.Fusce.diam@Donec.com","phone":"(233) 738-2360"},{"id":9,"name":"Thomas Lucas","email":"nec@Nulla.com","phone":"(704) 398-7993"},{"id":10,"name":"Alec Howard","email":"Donec.elementum@scelerisquescelerisquedui.net","phone":"(748) 206-2688"},{"id":"6a31f94f-6d28-493f-b7ba-6604bb6fe6c9","name":"Mango","email":"mango@gmail.com","phone":"322-22-22"}]';
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



export { listContacts, getContactById}
