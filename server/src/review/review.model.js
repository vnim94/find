const { Schema, model } = require('mongoose');

const RatingsSchema = new Schema({
    average: {
        type: Number,
        min: 0.0,
        max: 5.0,
        default: function() { 
            return (this.benefits + this.career + this.balance + this.environment + this.management + this.diversity) / 6;
        }
    },
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
        type: String,
        required: true
    },
    current: {
        type: Boolean,
        default: true
    },
    length: {
        type: String,
        enum: ['Less than 1 year', '1 - 2 years', '3 - 4 years', '5 - 6 years', '7 - 8 years', '9 - 10 years', '11 - 12 years', 'Over 12 years']
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

module.exports = model('Review', ReviewSchema);