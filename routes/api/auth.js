const express = require('express');
const {ctrlWrapper} = require("../../helpers");
const ctrl = require("../../controllers/auth");
const {validationBody} = require("../../middlewares");
const {schemas} = require("../../models/user")
const router = express.Router();

router.post("/register", validationBody(schemas.registerSchema), ctrlWrapper(ctrl.register));
router.post("/login", validationBody(schemas.loginSchema), ctrlWrapper(ctrl.login));

module.exports = router;