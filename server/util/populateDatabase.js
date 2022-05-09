#! /usr/bin/env node
require('dotenv').config();
const { faker } = require('@faker-js/faker');
const mongoose = require('mongoose');
const async = require('async');

const User = require('../src/user/user.model');
const Location = require('../src/job/location.model');
const Company = require('../src/company/company.model');
const Job = require('../src/job/job.model');
const Industry = require('../src/job/industry.model');
const Profession = require('../src/job/profession.model');
const Review = require('../src/review/review.model');

mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true });
const database = mongoose.connection;
database.once('open', () => console.log('[INFO] Successfully connected to database'));
database.on('error', console.error.bind(console, 'Error connecting to database'));

const states = {
    'VIC':'Melbourne',
    'NSW':'Sydney',
    'QLD':'Brisbane',
    'WA':'Perth',
    'TAS':'Hobart',
    'NT':'Darwin',
    'SA':'Adelaide'
};

const suburbs = [
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
]

const companySizes = ['Less than 100', '100-500', '501-1,000', '1,001-5,000', '5,000-10,000', 'More than 10,001']

const companyNamesAndLogos = {
    'Apple': "https://www.transparentpng.com/thumb/apple-logo/Ts2ZlF-apple-logo-free-png.png",
    'SEEK': "https://logosvector.net/wp-content/uploads/2013/12/seek-vector-logo.png",
    'Microsoft': "https://www.transparentpng.com/thumb/windows/7Pqun8-download-windows-logo-emblem-png.png",
    'Google': "https://www.transparentpng.com/thumb/google-logo/colorful-google-logo-transparent-clipart-download-u3DWLj.png",
    'Netflix': "https://www.freepnglogos.com/uploads/netflix-logo-circle-png-5.png",
    'Meta': "https://static.vecteezy.com/system/resources/previews/004/263/114/non_2x/meta-logo-meta-by-facebook-icon-editorial-logo-for-social-media-free-vector.jpg",
    'Airbnb': "https://logodownload.org/wp-content/uploads/2016/10/airbnb-logo-0.png",
    'Spotify': "https://www.freepnglogos.com/uploads/spotify-logo-png/spotify-brands-logo-34.png",
    'Reddit': "https://www.logo.wine/a/logo/Reddit/Reddit-Vertical-Color-Logo.wine.svg",
}

const workTypes = [
    'Full time',
    'Part time',
    'Contract/Temp',
    'Casual/Vacation'
];

const industryTypes = {
    '0000': 'Accounting',
    '0001': 'Administration & Office Support',
    '0002': 'Advertising, Arts & Media',
    '0003': 'Banking & Financial Services',
    '0004': 'Call Centre & Customer Service',
    '0005': 'CEO & General Management',
    '0006': 'Community Services & Development',
    '0007': 'Construction',
    '0008': 'Consulting & Strategy',
    '0009': 'Design & Architecture',
    '0010': 'Education & Training',
    '0011': 'Engineering',
    '0012': 'Farming, Animals & Conservation',
    '0013': 'Government & Defence',
    '0014': 'Healthcare & Medical',
    '0015': 'Hospitality & Tourism',
    '0016': 'Human Resources & Recruitment',
    '0017': 'Information & Communication Technology',
    '0018': 'Insurance & Superannuation',
    '0019': 'Legal',
    '0020': 'Manufacturing, Transport & Logistics',
    '0021': 'Marketing & Communications',
    '0022': 'Mining, Resources & Energy',
    '0023': 'Real Estate & Property',
    '0024': 'Retail & Consumer Products',
    '0025': 'Sales',
    '0026': 'Science & Technology',
    '0027': 'Self Employment',
    '0028': 'Sport & Recreation',
    '0029': 'Trades & Services'
}

const professionTypes = {
    'Architects': ['Software Architect'],
    'Business/System Analysts': ['Business Analyst'],
    'Developers/Programmers': ['Software Developer', 'Software Engineer', 'Web Developer', 'Tech Lead'],
    'Testing & Quality Assurance': ['QA Analyst', 'Test Engineer', 'Test Automation Lead'],
    'Product Management & Development': ['Product Manager'],
    'Network & Systems Administration': ['Network Engineer', 'System Administrator'],
    'Database Development & Administration': ['Database Consultant', 'Database Administrator']
};

const payBases = Array(21).fill().map((value, index) => 10000 * index);

let users = [];
let locations = [];
let companies = [];
let industries = [];
let professions = [];

function createUser(firstName, lastName, email, location, password, phone, callback) {

    let details = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        location: location,
        password: password,
        phone: phone
    }

    let user = new User(details);
         
    user.save((err) => {

        if (err) {
            console.log(`[ERROR] Error creating user: ${user.firstName} ${user.lastName} - ${err}`);
            callback(err, null);
            return;
        }

        console.log(`[INFO] New user created: ${user.firstName} ${user.lastName}`);
        users.push(user);
        callback(null, user);

    });

}

function createLocation(suburb, city, state, region, callback) {
    let location = new Location({ suburb, city, state, region });
    location.save((err) => {
        if (err) {
            console.log(`[ERROR] Error creating location: ${location.region}-${location.state}-${location.city}-${location.suburb} - ${err}`);
            callback(err, null);
            return;
        }

        console.log(`[INFO] New location created: ${location.region}-${location.city}-${location.suburb}`);
        locations.push(location);
        callback(null, location);
    })
}

function createCompany(name, website, industry, specialities, headquarters, overview, mission, culture, size, logo, callback) {

    let company = new Company({name, website, industry, specialities, headquarters, overview, mission, culture, size, logo});
    
    company.save((err) => {
        if (err) {
            console.log(`[ERROR] Error creating company: ${company.name} - ${err}`);
            callback(err, null);
            return;
        }

        console.log(`[INFO] New company created: ${company.name}`);
        companies.push(company);
        callback(null, company);
    })
}

function createIndustry(name, code, callback) {
    let industry = new Industry({
        name: name,
        code: code
    })

    industry.save((err) => {
        if (err) {
            console.log(`[ERROR] Error creating industry: ${industry.name} - ${err}`);
            callback(err, null);
            return;
        }

        console.log(`[INFO] New industry created: ${industry.name}`);
        industries.push(industry);
        callback(null, industry);
    })
}

function createProfession(name, industry, code, callback) {
    let profession = new Profession({
        name: name,
        industry: industry,
        code: code
    })

    profession.save((err) => {
        if (err) {
            console.log(`[ERROR] Error creating profession: ${profession.name} - ${err}`);
            callback(err, null);
            return;
        }

        console.log(`[INFO] New profession created: ${profession.name}`);
        professions.push(profession);
        callback(null, profession);
    })
}

function createJob(details, callback) {

    let job = new Job(details);

    job.save((err) => {
        if (err) {
            console.log(`[ERROR] Error creating job: ${job.title} - ${job.company.name} - ${err}`);
            callback(err, null);
            return;
        }

        console.log(`[INFO] New job created: ${job.title} - ${job.company.name}`);
        callback(null, job);
    })

}

function createReview(details, callback) {
    let review = new Review(details);
    review.save((err) => {
        if (err) {
            console.log(`[ERROR] Error creating review: ${review._id} - ${err}`);
            callback(err, null);
            return;
        }

        console.log(`[INFO] New review created: ${review._id}`);
        callback(null, review);
    })
    
}

function updateAverageRating(company, callback) {
    Review.aggregate([
        { $match: { company: company._id } },
        { $group: { _id: '$company', averageRating: { $avg: '$ratings.average' }, totalCount: { $count: {} } } },
    ], function(err, reviews) {
        if (err) {
            console.log(`[ERROR] Error aggregating reviews for ${company.name} - ${err}`)
        } else {
            Company.findByIdAndUpdate(company._id, {
                reviews: {
                    averageRating: Math.round(reviews[0].averageRating * 10) / 10,
                    totalCount: reviews[0].totalCount
                }
            },function(err, result) {
                console.log(`[INFO] Updated ${company.name} reviews average rating and totalCount`)
            })
        }
        callback(null, reviews)
    })
}

function populateUsers(callback) {

    let usersToCreate = [];

    for (let i = 0; i < 5; i++) {
        let firstName = faker.name.firstName();
        let lastName = faker.name.lastName();
        let email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@email.com`
        let location = states[Object.keys(states)[getRandomIndex(Object.keys(states).length)]]
        usersToCreate.push(function(callback) { createUser(firstName, lastName, email, location, 'password', faker.phone.phoneNumber(), callback) });
    }

    async.series(usersToCreate, callback);

}

function populateLocations(callback) {
    let locationsToCreate = [];
    Object.keys(states).forEach(state => {
        suburbs.forEach(suburb => {
            locationsToCreate.push(function(callback) {
                createLocation(suburb, states[state], state, 'Australia', callback);
            })
        })
    })
    async.series(locationsToCreate, callback);
}

function populateCompanies(callback) {
    let companiesToCreate = [];

    Object.keys(companyNamesAndLogos).forEach(company => {
        let website = `${company.toLowerCase()}.com`;
        let logo = companyNamesAndLogos[company];
        let specialities = Array(3).fill().map(i => { return faker.lorem.words(3) });
        let overview = faker.lorem.paragraph();
        let headquarters = `${faker.address.streetAddress()}, ${faker.address.cityName()}`
        let mission = faker.lorem.sentence();
        let size = companySizes[getRandomIndex(companySizes.length)]
        let culture = {
            keyMessage: { heading: faker.lorem.words(), text: faker.lorem.sentence() },
            values: Array(Math.ceil(Math.random() * 6)).fill().map(_ => { return { heading: faker.lorem.words(), text: faker.lorem.sentence() } }),
            perks: Array(Math.ceil(Math.random() * 6)).fill().map(_ => { return { heading: faker.lorem.words(), text: faker.lorem.sentence() } }),
            diversity: faker.lorem.sentences(2)
        }
        companiesToCreate.push(function(callback) { createCompany(company, website, industries[getRandomIndex(industries.length)], specialities, headquarters, overview, mission, culture, size, logo, callback) });
    })

    async.series(companiesToCreate, callback);
}

function populateIndustries(callback) {
    let industriesToCreate = [];
    Object.keys(industryTypes).forEach(code => {
        industriesToCreate.push(function(callback) { createIndustry(industryTypes[code], code, callback) });
    })
    async.series(industriesToCreate, callback);
}

function populateProfessions(callback) {
    let professionsToCreate = [];
    const industry = industries.find(industry => industry.code === '0017');
    Object.keys(professionTypes).forEach((profession, index) => {
        professionsToCreate.push(function(callback) { createProfession(profession, industry._id, String(index).padStart(4,0), callback) });
    })
    async.series(professionsToCreate, callback);
}

function populateJobs(callback) {
    let jobsToCreate = [];
    const industry = industries.find(industry => industry.code === '0017');

    for (let i = 0; i < 150; i++) {

        let profession = professions[getRandomIndex(professions.length)]
        let payBase = getRandomIndex(payBases.length)

        let details = {
            title: professionTypes[profession.name][getRandomIndex(professionTypes[profession.name].length)],
            headliner: faker.lorem.sentence(),
            summary: faker.lorem.lines(3),
            description: faker.lorem.paragraphs(3),
            company: companies[getRandomIndex(companies.length)],
            location: locations[getRandomIndex(locations.length)],
            industry: industry._id,
            profession: profession._id,
            workType: workTypes[getRandomIndex(workTypes.length)],
            payBase: payBases[payBase],
            payCeiling: payBases[getRandomIndex(payBases.length - payBase) + payBase],
            added: Date.now() - getRandomIndex(30) * 24 * 60 * 60 * 1000
        }
        
        jobsToCreate.push(function(callback) { createJob(details, callback) });
    }

    async.series(jobsToCreate, callback);
}

function populateReviews(callback) {
    let reviewsToCreate = [];
    for (let i = 0; i < 150; i++) {
        let profession = Object.keys(professionTypes)[getRandomIndex(Object.keys(professionTypes).length)]
        let details = {
            title: faker.lorem.words(3).slice(0,30),
            user: users[getRandomIndex(users.length)]._id,
            company: companies[getRandomIndex(companies.length)]._id,
            ratings: {
                benefits: Math.round(Math.random() * 5 * 10) / 10,
                career: Math.round(Math.random() * 5 * 10) / 10,
                balance: Math.round(Math.random() * 5 * 10) / 10,
                environment: Math.round(Math.random() * 5 * 10) / 10,
                management: Math.round(Math.random() * 5 * 10) / 10,
                diversity: Math.round(Math.random() * 5 * 10) / 10
            },
            good: faker.lorem.sentences(3),
            bad: faker.lorem.sentences(3),
            role: professionTypes[profession][getRandomIndex(professionTypes[profession].length)],
            location: locations[getRandomIndex(locations.length)]._id,
            recommend: Math.round(Math.random) === 1 ? true : false,
            salary: ['High', 'Average', 'Low'][getRandomIndex(3)]
        }
        reviewsToCreate.push(function(callback) { createReview(details, callback) });
    }

    async.series(reviewsToCreate, callback);
}

function populateAverageRatings(callback) {
    let updates = [];
    companies.forEach(company => {
        updates.push(function(callback) { updateAverageRating(company, callback) });
    })
    async.series(updates, callback);
}

function getRandomIndex(length) {
    return Math.floor(Math.random() * length);
}

console.log('[INFO] Populating database...');

async.series([
    populateUsers, 
    populateLocations, 
    populateIndustries, 
    populateCompanies, 
    populateProfessions, 
    populateJobs, 
    populateReviews,
    populateAverageRatings
], (err) => {
    if (err) {
        console.log(`[ERROR] ${err}`);
    }
    else {
        console.log('[INFO] Data successfully loaded!');
    }
    // mongoose.connection.close();
});

