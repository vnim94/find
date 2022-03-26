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

exports.createToken = (id) => {
    return jwt.sign(id, process.env.TOKEN_SECRET);
}

exports.authenticateToken = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    jwt.verify(token, process.env.TOKEN_SECRET, (err, id) => {
        if (!err) req.user = id;
    });
    next();
}