import { program } from "commander";
import {
  getContacts,
  getContact,
  addContact,
  deleteContact,
} from "./contacts.js";

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await getContacts();
      console.log(allContacts);
      break;

    case "get":
      const contact = await getContact(id);
      console.log(contact);
      break;

    case "add":
      const newContact = await addContact({
        name: name,
        email: email,
        phone: phone,
      });
      console.log(newContact);
      break;

    case "remove":
      const removeContact = await deleteContact(id);
      console.log(removeContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);
