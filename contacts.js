const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath  = path.resolve("db/contacts.json");

async function listContacts() {
    try {
        const contacts = await fs.readFile(contactsPath);
        return JSON.parse(contacts);
    } catch (error){
        console.log(error.message);
  }
}

async function getContactById(contactId) {
    try {
        const contacts = await listContacts();
        const oneContact = contacts.find(item => item.id === contactId);
        return oneContact || null;
    } catch (error){
        console.log(error.message);
    }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const indexToRemove = contacts.findIndex((item) => item.id === contactId);

    if (indexToRemove === -1) {
      console.log(`Contact with ID ${contactId} not found.`);
      return null;
    }

    const removedContact = contacts.splice(indexToRemove, 1)[0];
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

    return removedContact;
  } catch (error) {
    console.log(error.message);
  }
}

async function addContact(name, email, phone) {
    try {
        const contacts = await listContacts();
        const newContact = {
            id: nanoid(),
            name,
            email,
            phone,
        };
        contacts.push(newContact);
        await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
        return newContact;
    } catch (error) {
        console.log(error.message);
  }
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
};