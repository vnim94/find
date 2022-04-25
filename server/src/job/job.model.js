const { Schema, model } = require('mongoose');

const JobSchema = new Schema({
    title: {
        type: String,
        minLength: 5,
        maxLength: 30,
        required: true
    },
    headliner: {
        type: String,
        minLength: 5,
        maxLength: 100,
        required: true
    },
    summary: {
        type: String,
        minLength: 5,
        maxLength: 250
    },
    description: {
        type: String,
        minLength: 5,
        maxLength: 4000,
        required: true
    },
    company: {
        type: Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    location: {
        type: Schema.Types.ObjectId,
        ref: 'Location',
        required: true
    },
    industry: {
        type: Schema.Types.ObjectId,
        ref: 'Industry',
        required: true
    },
    profession: {
        type: Schema.Types.ObjectId,
        ref: 'Profession',
        required: true
    },
    workType: {
        type: String,
        enum: ['Full time', 'Part time', 'Contract/Temp', 'Casual/Vacation'],
        required: true
    },
    payBase: {
        type: Number,
        min: 0
    },
    payCeiling: {
        type: Number,
        default: function() { if (this.payBase) return this.payBase }
    },
    added: {
        type: Date,
        default: Date.now
    },
    closing: {
        type: Date,
        default: function() { return this.added.getTime() + 30 * 24 * 60 * 60 * 1000 }
    }
})

module.exports = model('Job', JobSchema);