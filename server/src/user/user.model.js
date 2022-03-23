const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 2,
        maxLength: 25,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        minLength: 5,
        required: true
    }
}, { 
    toJSON: { virtuals: true }
})

UserSchema.virtual('url').get(function() {
    return `/api/user/${this._id}`;
})

module.exports = mongoose.model('User', UserSchema);
