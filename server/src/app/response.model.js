const { Schema, model } = require('mongoose');

const ResponseSchema = Schema({
    question: {
        type: Schema.Types.ObjectId,
        ref: 'Question',
        required: true
    },
    app: {
        type: Schema.Types.ObjectId,
        ref: 'App',
        required: true
    },
    content: {
        type: String,
        minLength: 15,
        maxLength: 250,
        required: true
    }
})

module.exports = model('Response', ResponseSchema);