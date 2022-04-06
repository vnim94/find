const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        minLength: 2,
        maxLength: 25
    },
    lastName: {
        type: String,
        minLength: 2,
        maxLength: 25
    },
    email: {
        type: String,
        required: true
    },
    location: {
        type: String
    },
    password: {
        type: String,
        minLength: 5,
        required: true
    },
    phone: {
        type: String
    }
}, { 
    toJSON: { virtuals: true }
})

UserSchema.virtual('fullName').get(function() {
    return `${this.firstName} ${this.lastName}`;
})

UserSchema.pre('save', function() {
    const encryptedPassword = bcrypt.hashSync(this.password, 10);
    this.password = encryptedPassword;
})

module.exports = mongoose.model('User', UserSchema);
