const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const {uuid} = require('uuid');
const {User} = require("../../models/user");

const {RequestError, sendEmail} = require("../../helpers")

const register = async (req, res) => {
const {email, password} = req.body;
const user = await User.findOne({email});
if(user){
    throw RequestError(409, "Email already exist");
}
const hashPassword = await bcrypt.hash(password, 10);
const avatarURL = gravatar.url(email);
const verificationToken = uuid();
const result = await User.create({email, password: hashPassword, avatarURL, verificationToken});
const mail = {
    to: email,
    subject: 'Please, confirm registration on the site',
    html: `<a href="http://localhost:3000/api/auth/verify/${verificationToken}" target='_blanck'>Click to confirm on email</a>`
}
await sendEmail(mail);
res.status(201).json({
    email: result.email,
})
}

module.exports = register;