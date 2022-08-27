const express = require("express");

const ctrl = require("../../controllers/contacts");

const {ctrlWrapper} = require('../../helpers');

const {validationBody} = require('../../middlewares');

const schemas = require('../../schemas/contacts')

const { json } = require("express");

const router = express.Router();

// router.get("/", ctrlWrapper(ctrl.listContacts));

// router.get("/:id", ctrlWrapper(ctrl.getContactById));

router.post("/", 
// validationBody(schemas.add), 
ctrlWrapper(ctrl.addContact));

// router.delete("/:id", ctrlWrapper(ctrl.removeContact));

// router.put("/:id", validationBody(schemas.add), ctrlWrapper(ctrl.updateContactbyId));

module.exports = router;
