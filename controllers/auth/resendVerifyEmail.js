const { User } = require('../../models');
const { HttpError, sendEmail } = require('../../helpers');
const {PROJECT_URL} = process.env;

const resendVerifyEmail = async(req, res) => {
    const {email} = req.body;
    const user = await User.findOne({email});
    if(!user){
        throw new HttpError(404, 'User not found');
    };
    if(user.verify){
        throw new HttpError(400, 'Verification has already been passed');
    }

    const verifyEmail = {
        to: email,
        subject: "Verify email",
        html: `<a target="_blank" href="${PROJECT_URL}/api/users/verify/${user.verificationToken}">Click to verify email</a>`
    };

    await sendEmail(verifyEmail);

    res.json({
        message: 'Verification email sent'
    })
};

module.exports = resendVerifyEmail;