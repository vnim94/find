const { Schema, model } = require('mongoose');

const IndustrySchema = Schema({
    name: {
        type: String,
        required: true
    },
    code: {
        type: String,
        validate: {
            validator: (v) => { return /\d{4}/.test(v) },
            message: 'Must be a 4-digit code',
        },
        required: true
    }
})

module.exports = model('Industry', IndustrySchema);