const { Schema, model } = require('mongoose');

const ReviewSchema = Schema({
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
        type: String,
        enum: [
            'Australian Capital Territory', 
            'New South Wales', 
            'Northern Territory', 
            'Queensland', 
            'South Australia', 
            'Tasmania',
            'Victoria',
            'Western Australia'
        ],
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
        type: Boolean
    },
    flagged: {
        type: Boolean
    }
},{
    toJSON: { virtuals: true }
})

ReviewSchema.virtual('rating').get(function() {
    return (this.benefits + this.career + this.balance + this.environment + this.management + this.diversity) / 6
})

module.exports = model('Review', ReviewSchema);