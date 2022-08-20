const express = require("express");

const {RequestError} = require('../../helpers');

const Joi = require('joi');

const contacts = require("../../models/contacts");

const router = express.Router();

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required()
})

router.get("/", async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (error) {
    next(error)
  }
});

router.get("/:id", async (req, res, next) => {
try {
  const {id} = req.params;
  const result = await contacts.getContactById(id);
  if(!result){
      throw RequestError (404, 'Not found')
}
  res.json(result);
  } catch (error) {
    next(error)
} 
});

router.post("/", async (req, res, next) => {
try {
  const {error} = contactSchema.validate(req.body);
  if(error){
    throw RequestError(400, error.message);
  }
  const result = await contacts.addContact(req.body);
  res.status(201).json(result);
  } catch (error) {
  next(error)
}
 });

router.delete("/:contactId", async (req, res, next) => {
  const result = await contacts.removeContact();
  res.json(result);
});

router.put("/:contactId", async (req, res, next) => {
  const result = await contacts.updateContact();
  res.json(result);
});

module.exports = router;
