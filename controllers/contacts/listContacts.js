const {Contact} = require('../../models/contacts')

const listContacts = async (_, res) => {
  const result = await Contact.find({}, "-createdAt -updateAt");
  res.json(result);
};

module.exports = listContacts;
