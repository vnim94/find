const { Schema, model } = require('mongoose');

const AppSchema = Schema({
    applicant: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    job: {
        type: Schema.Types.ObjectId,
        ref: 'Job',
        required: true
    },
    resume: {
        type: String
    },
    letter: {
        type: String
    },
    status: {
        type: String,
        enum: ['New', 'In Review', 'Interview', 'Offered', 'Hired', 'Rejected', 'Withdrawn'],
        required: true
    }
})

module.exports = model('App', AppSchema);