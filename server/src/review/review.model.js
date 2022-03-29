const { Schema, model } = require('mongoose');

const ReviewSchema = Schema({
    title: {
        type: String,
        required: true        
    },
    company: {

    },
    rating: {

    },
    good: {

    },
    bad: {

    },
    role: {

    },
    date: {

    },
    location: {

    },
    recommend: {

    },
    helpful: {

    },
    flagged: {

    }
})

module.exports = model('Review', ReviewSchema);