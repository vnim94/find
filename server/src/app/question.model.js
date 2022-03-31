const { Schema, model } = require('mongoose');

const QuestionSchema = Schema({
    job: {
        type: Schema.Types.ObjectId,
        ref: 'Job',
        required: true
    },
    content: {
        type: String,
        minLength: 10,
        maxLength: 100,
        required: true
    }
})

module.exports = model('Question', QuestionSchema);