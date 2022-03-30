const { Schema, model } = require('mongoose');

const ReviewSchema = Schema({
    title: {
        type: String,
        required: true        
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    company: {
        type: Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    rating: {
        type: Schema.Types.ObjectId,
        ref: 'Rating'
    },
    good: {
        type: String,
        maxLength: 150,
        required: true
    },
    bad: {
        type: String,
        maxLength: 150,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    location: {
        type: String,
        required: true
    },
    recommend: {
        type: Boolean,
        required: true
    },
    helpful: {
        type: Boolean
    },
    flagged: {
        type: Boolean
    }
})

module.exports = model('Review', ReviewSchema);