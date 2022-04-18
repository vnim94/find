const { Schema, model } = require('mongoose');

const IndustrySchema = Schema({
    name: {
        type: String,
        required: true
    },
    code: {
        type: String,
        validate: {
            validator: (v) => { return /\d{4}/.test(v) },
            message: 'Must be a 4-digit code',
        },
        required: true
    }
},{
    toJSON: { virtuals: true }
})

IndustrySchema.virtual('jobs', {
    ref: 'Job',
    localField: '_id',
    foreignField: 'industry'
})

IndustrySchema.virtual('jobCount', {
    ref: 'Job',
    localField: '_id',
    foreignField: 'industry',
    count: true
})

IndustrySchema.virtual('professions', {
    ref: 'Profession',
    localField: '_id',
    foreignField: 'industry'
})

module.exports = model('Industry', IndustrySchema);