require('dotenv').config();
const User = require('../user/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.authenticateUser = async (email, password) => {
    const user = await User.findOne({ email: email });
    if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign(user.id.toString(), process.env.TOKEN_SECRET);
        return { token, user }
    }
}