const { Schema, model } = require('mongoose');

const JobSchema = Schema({
    title: {
        type: String,
        minLength: 5,
        maxLength: 30,
        required: true
    },
    description: {
        type: String,
        minLength: 5,
        maxLength: 4000,
        required: true
    },
    company: {
        type: Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    city: {
        type: String,
        required: true
    },
    industry: {
        type: String,
        required: true
    },
    profession: {
        type: String,
        required: true
    },
    workType: {
        type: String,
        enum: ['Full time', 'Part time', 'Contract/Temp', 'Casual/Vacation'],
        required: true
    },
    added: {
        type: Date,
        default: Date.now
    },
    closing: {
        type: Date,
        default: () => Date.now() + (30 * 24 * 60 * 60 * 1000)
    },
    expired: {
        type: Boolean,
        default: false
    }
})

module.exports = model('Job', JobSchema);