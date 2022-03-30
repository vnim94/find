const { Schema, model } = require('mongoose');

const RatingSchema = Schema({
    review: {
        type: Schema.Types.ObjectId,
        ref: 'Review',
        required: true   
    },
    benefits: {
        type: Number,
        min: 0.0,
        max: 5.0,
        required: true
    },
    career: {
        type: Number,
        min: 0.0,
        max: 5.0,
        required: true
    },
    balance: {
        type: Number,
        min: 0.0,
        max: 5.0,
        required: true
    },
    environment: {
        type: Number,
        min: 0.0,
        max: 5.0,
        required: true
    },
    management: {
        type: Number,
        min: 0.0,
        max: 5.0,
        required: true
    },
    diversity: {
        type: Number,
        min: 0.0,
        max: 5.0,
        required: true
    }
}, {
    toJSON: { virtuals: true }
})

RatingSchema.virtual('averageRating').get(function() {
    return (this.benefits + this.career + this.balance + this.environment + this.management + this.diversity) / 6
})

module.exports = model('Rating', RatingSchema);