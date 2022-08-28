const express = require("express");

const ctrl = require("../../controllers/contacts");

const { ctrlWrapper } = require("../../helpers");

const { validationBody, isValidId } = require("../../middlewares");

const { schemas } = require("../../models/contacts");

const { json } = require("express");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.listContacts));

router.get("/:id", isValidId, ctrlWrapper(ctrl.getContactById));

router.post(
  "/",
  validationBody(schemas.addSchema),
  ctrlWrapper(ctrl.addContact)
);

router.delete("/:id", isValidId, ctrlWrapper(ctrl.removeContact));

router.put(
  "/:id",
  isValidId,
  validationBody(schemas.addSchema),
  ctrlWrapper(ctrl.updateContactbyId)
);

router.patch(
  "/:id/favorite",
  isValidId,
  validationBody(schemas.updateFavoriteSchema),
  ctrlWrapper(ctrl.updateFavorite)
);

module.exports = router;
