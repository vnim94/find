const { Schema, model } = require('mongoose');

const CompanySchema = Schema({
    name: {
        type: String,
        minLength: 2,
        maxLength: 25,
        required: true
    },
    headquarters: {
        type: String,
    },
    overview: {
        type: String
    },
    averageRating: {
        type: Number,
        min: 0.0,
        max: 5.0
    },
    size: {
        type: String,
        enum: ['Less than 100', '100-500', '501-1,000', '1,001-5,000', '5,000-10,000', 'More than 10,001']
    }
})

module.exports = model('Company', CompanySchema);