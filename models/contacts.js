const Joi = require("joi");
const { Schema, model } = require("mongoose");
const {handleSchemaValidationErrors} = require('../helpers')

const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    match: /^[(]\d{3}[)] \d{3}-\d{4}$/,
    required: true,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
owner: {
  type: Schema.Types.ObjectId,
  ref: "user",
  required: true,
}
 },
 {versionKey: false, timestamps: true});

 contactSchema.post("save", handleSchemaValidationErrors);

 const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.bool(),
 });

const updateFavoriteSchema = Joi.object({
  favorite: Joi.bool().required(),
})

const schemas = {
  addSchema,
  updateFavoriteSchema,
}

const Contact = model("contact", contactSchema);

module.exports = {Contact, schemas};
