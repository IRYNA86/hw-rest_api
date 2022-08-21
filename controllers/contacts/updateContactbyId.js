const contacts = require("../../models/contacts");

const RequestError = require("../../helpers/RequestError");

const updateContactbyId = async (req, res) => {
  const { id } = req.params;
  const result = await contacts.updateContactbyId(id, req.body);
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.json(result);
};

module.exports = updateContactbyId;
