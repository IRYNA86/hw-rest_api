const fs = require('fs/promises');
const path = require('path');
const {v4: uuidv4} = require('uuid');

const contactsPath = path.resolve('models/contacts.json')

const updateContact = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
};

const getContactById = async (id) => {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === id);
  if(!result){
    return null;
  }
  return result;
};

const removeContact = async (id) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id === id);
  if (idx === -1) {
    return null;
  }
  const [result] = contacts.splice(idx, 1);
  await updateContact(contacts);
  return result;
}

const addContact = async (body) => {
  const contacts = await listContacts();
  const { name, email, phone } = body;
  const newContact = {
    id: uuidv4(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await updateContact(contacts);
  return newContact;
}

// const updateContact = async (contactId, body) => {}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
