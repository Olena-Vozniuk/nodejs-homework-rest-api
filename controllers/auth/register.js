const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const {nanoid} = require('nanoid');
const { User } = require('../../models');
const { HttpError, sendEmail } = require('../../helpers');
require('dotenv').config();
const {PROJECT_URL} = process.env;

const register = async(req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});

    if(user){
        throw new HttpError(409, 'Email in use');
    };

    const hashPassword = await bcrypt.hashSync(password, 10);
    const verificationToken = nanoid();
    const avatarURL = gravatar.url(email);

    const newUser = await User.create({
        ...req.body, 
        password: hashPassword,
        avatarURL,
        verificationToken
    });

    const verifyEmail = {
        to: email,
        subject: "Verify email",
        html: `<a target="_blank" href="${PROJECT_URL}/api/users/verify/${verificationToken}">Click to verify email</a>`
    }

    await sendEmail(verifyEmail);

    res.json({ 
        user:{
            email: newUser.email,
            subscription: "starter"
        }        
    });
};

module.exports = register;

