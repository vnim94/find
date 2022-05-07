const { Schema, model } = require('mongoose');
const Review = require('../review/review.model');

const TextSchema = new Schema({
    heading: String,
    text: String
})

const CompanySchema = new Schema({
    name: {
        type: String,
        minLength: 2,
        maxLength: 25,
        required: true
    },
    website: String,
    industry: {
        type: Schema.Types.ObjectId,
        ref: 'Industry',
        required: true
    },
    specialities: [String],
    headquarters: String,
    overview: String,
    mission: String,
    culture: {
        image: String,
        keyMessage: TextSchema,
        values: [TextSchema],
        perks: [TextSchema],
        diversity: String
    },
    size: {
        type: String,
        enum: ['Less than 100', '100-500', '501-1,000', '1,001-5,000', '5,000-10,000', 'More than 10,001']
    }, 
    logo: String
})

CompanySchema.methods.getAverageReviewRating = async function() {
    const review = await Review.aggregate([
        { $group: { _id: this._id, averageRating: { $avg: "$averageRating" } }}
    ])

    return review[0].averageRating.toFixed(1);
}

module.exports = model('Company', CompanySchema);