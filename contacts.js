const fs = require('fs/promises');
const path = require('path');
const { v4 } = require('uuid');

const contactsPath = path.join(__dirname, '/db/contacts.json');


async function listContacts() {
    try {
        const data = await fs.readFile(contactsPath, 'utf-8');
        const contacts = JSON.parse(data);
        return contacts;
    }
    catch (error) {
        console.log(error.message);
    }
}

async function getContactById(contactId) {
    try {
        const contacts = await listContacts();
        const requestedContact = contacts.find(contact => contact.id === contactId);
        if (!requestedContact) throw new Error('Invalid id!');
        return requestedContact;
    }
    catch (error) {
        console.log(error.message);
    }
}

async function removeContact(contactId) {
    try {
        const contacts = await listContacts();
        const index = contacts.findIndex(contact => contact.id === contactId);
        if (index === -1) throw new Error('Invalid ID to delete!');
        const filteredContacts = contacts.filter(contact => contact.id !== contactId)
        await fs.writeFile(contactsPath, JSON.stringify(filteredContacts));
        return contactId;

    }
    catch (error) {
        console.log(error.message);
    }
}

async function addContact(name, email, phone) {
    try {
        const contacts = await listContacts();
        const id = v4();
        const newContact = { id, name, email, phone }
        const newContacts = [...contacts, newContact ];
        const newContactsStr = JSON.stringify(newContacts);
        await fs.writeFile(contactsPath, newContactsStr);
        return newContact;
     }
    catch (error) {
        console.log(error);
    }
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}