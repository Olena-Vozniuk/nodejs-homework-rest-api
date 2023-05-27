const bcrypt = require('bcryptjs');
const { User } = require('../../models');
const { HttpError } = require('../../helpers');

const register = async(req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});

    if(user){
        throw new HttpError(409, 'Email in use');
    };

    const hashPassword = await bcrypt.hashSync(password, 10);
    const newUser = await User.create({
        ...req.body, password: hashPassword
    });

    res.json({ 
        user:{
            email: newUser.email,
            subscription: "starter"
        }        
    });
};

module.exports = register;
