const { Schema, model } = require('mongoose');

const LocationSchema = Schema({
    suburb: {
        type: String,
        enum: [
            'CBD', 
            'Inner Suburbs', 
            'Inner West Suburbs', 
            'Inner East Suburbs',
            'Inner North Suburbs',
            'Inner South Suburbs', 
            'Western Suburbs', 
            'Eastern Suburbs', 
            'Southern Suburbs', 
            'Northern Suburbs'
        ],
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    region: {
        type: String,
        required: true
    }
})

module.exports = model('Location', LocationSchema);