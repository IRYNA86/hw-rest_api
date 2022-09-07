const bcrypt = require('bcryptjs');
const {User} = require("../../models/user");

const {RequestError} = require("../../helpers")

const login = async (req, res) => {
const {email, password} = req.body;
const user = await User.findOne({email});
if(!user){
throw RequestError(401, "Email is not found");
}
const comparePassword = await bcrypt.compare(password, user.password);
if(!comparePassword){
    throw RequestError(401, "Password is wrong");
}
const token = "125sprd.3153uhy.e7412758";
res.json({
    token,
})
}

module.exports = login;