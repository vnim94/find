const { Schema, model } = require('mongoose');

const ProfessionSchema = Schema({
    name: {
        type: String, 
        required: true
    },
    industry: {
        type: Schema.Types.ObjectId,
        ref: 'Industry',
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

module.exports = model('Profession', ProfessionSchema);