const { Schema, model } = require('mongoose');
const Company = require('../company/company.model');

const RatingsSchema = new Schema({
    benefits: {
        type: Number,
        default: 0.0,
        min: 0.0,
        max: 5.0,
        required: true
    },
    career: {
        type: Number,
        default: 0.0,
        min: 0.0,
        max: 5.0,
        required: true
    },
    balance: {
        type: Number,
        default: 0.0,
        min: 0.0,
        max: 5.0,
        required: true
    },
    environment: {
        type: Number,
        default: 0.0,
        min: 0.0,
        max: 5.0,
        required: true
    },
    management: {
        type: Number,
        default: 0.0,
        min: 0.0,
        max: 5.0,
        required: true
    },
    diversity: {
        type: Number,
        default: 0.0,
        min: 0.0,
        max: 5.0,
        required: true
    }
})

const ReviewSchema = new Schema({
    title: {
        type: String,
        minLength: 5,
        maxLength: 30,
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
    ratings: RatingsSchema,
    averageRating: {
        type: Number,
        min: 0.0,
        max: 5.0,
        default: function() { return calculateAverageRating(this.ratings) }
    },
    good: {
        type: String,
        minLength: 5,
        maxLength: 250,
        required: true
    },
    bad: {
        type: String,
        minLength: 5,
        maxLength: 250,
        required: true
    },
    role: {
        type: String,
        minLength: 5,
        maxLength: 25,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    location: {
        type: Schema.Types.ObjectId,
        ref: 'Location',
        required: true
    },
    recommend: {
        type: Boolean,
        required: true
    },
    salary: {
        type: String,
        enum: ['High', 'Average', 'Low'],
        required: true
    },
    helpful: {
        type: Number,
        default: 0
    },
    flagged: {
        type: Boolean,
        default: false
    }
})

function calculateAverageRating(ratings) {
    const { benefits, career, balance, environment, management, diversity } = ratings;
    let averageRating = (benefits + career + balance + environment + management + diversity) / 6;
    return Math.round(averageRating * 10) / 10;
}

module.exports = model('Review', ReviewSchema);