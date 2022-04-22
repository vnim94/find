const { Schema, model } = require('mongoose');

const LocationSchema = Schema({
    city: {
        type: String,
        required: true
    },
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
})

module.exports = model('Location', LocationSchema);