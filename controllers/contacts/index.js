const listContacts = require("./listContacts");
const getContactById = require("./getContactbyId");
const addContact = require('./addContact');
const removeContact = require('./removeContact');
const updateContactbyId = require('./updateContactbyId');
const updateFavorite = require('./updateFavorite')

module.exports = { 
    listContacts, 
    getContactById, 
    addContact, 
    removeContact, 
    updateContactbyId,
    updateFavorite, 
};
