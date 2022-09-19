const {User} = require('../../models/user');
const {RequestError, sendEmail} = require("../../helpers");

const resendVerifyEmail = async(req, res) => {
const {email} = req.body;
    const user = await User.findOne({email});
    if(!user){
        throw RequestError(404, 'Not found')
    }
    if(user.verify){
        throw RequestError(400, 'User have already verivied')
    }
    const mail = {
        to: email,
    subject: 'Please, confirm registration on the site',
    html: `<a href="http://localhost:3000/api/auth/verify/${user.verificationToken}" target='_blanck'>Click to confirm on email</a>`
};
await sendEmail(mail);
res.json({
    message: 'Email verify resend'
})
}

module.exports = resendVerifyEmail;