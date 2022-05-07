const { Schema, model } = require('mongoose');

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
    averageRating: {
        type: Number,
        min: 0.0,
        max: 5.0,
        default: 0.0
    },
    size: {
        type: String,
        enum: ['Less than 100', '100-500', '501-1,000', '1,001-5,000', '5,000-10,000', 'More than 10,001']
    }, 
    logo: String
})

module.exports = model('Company', CompanySchema);