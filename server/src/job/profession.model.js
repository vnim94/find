const { Schema, model } = require('mongoose');

const ProfessionSchema = new Schema({
    name: {
        type: String, 
        required: true
    },
    industry: {
        type: Schema.Types.ObjectId,
        ref: 'Industry',
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

ProfessionSchema.virtual('jobs', {
    ref: 'Job',
    localField: '_id',
    foreignField: 'profession'
})

ProfessionSchema.virtual('jobCount', {
    ref: 'Job',
    localField: '_id',
    foreignField: 'profession',
    count: true
})

module.exports = model('Profession', ProfessionSchema);