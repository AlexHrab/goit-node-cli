import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("db", "contacts.json");

function arrUpdate(value) {
  return fs.writeFile(contactsPath, JSON.stringify(value, null, 2));
}

export const getContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
};

export const getContact = async (id) => {
  const contacts = await getContacts();
  const result = contacts.find((contact) => contact.id === id);
  return result || null;
};

export const addContact = async (data) => {
  const contacts = await getContacts();
  const newContact = {
    id: nanoid(),
    ...data,
  };
  contacts.push(newContact);
  await arrUpdate(contacts);
  return newContact;
};

export const deleteContact = async (id) => {
  const contacts = await getContacts();
  const index = contacts.findIndex((contact) => contact.id === id);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await arrUpdate(contacts);
  return result;
};
