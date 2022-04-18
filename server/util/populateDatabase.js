#! /usr/bin/env node
require('dotenv').config();
const { faker } = require('@faker-js/faker');
const mongoose = require('mongoose');
const async = require('async');

const User = require('../src/user/user.model');
const Company = require('../src/company/company.model');
const Job = require('../src/job/job.model');
const Industry = require('../src/job/industry.model');
const Profession = require('../src/job/profession.model');

mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true });
const database = mongoose.connection;
database.once('open', () => console.log('[INFO] Successfully connected to database'));
database.on('error', console.error.bind(console, 'Error connecting to database'));

const cities = [
    'Melbourne',
    'Sydney',
    'Brisbane',
    'Perth',
    'Hobart',
    'Darwin',
    'Adelaide'
];

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

const companyNames = [
    'Apple',
    'SEEK Limited',
    'Microsoft',
    'Google',
    'Netflix',
    'Meta',
    'Airbnb',
    'Spotify',
    'Reddit',
]

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
        callback(null, user);

    });

}
  
function createCompany(name, callback) {

    let company = new Company({ name: name });

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

function populateUsers(callback) {

    let usersToCreate = [];

    for (let i = 0; i < 5; i++) {
        let firstName = faker.name.firstName();
        let lastName = faker.name.lastName();
        let email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@email.com`
        usersToCreate.push(function(callback) { createUser(firstName, lastName, email, cities[getRandomIndex(cities.length)], 'password', faker.phone.phoneNumber(), callback) });
    }

    async.series(usersToCreate, callback);

}

function populateCompanies(callback) {
    let companiesToCreate = [];

    companyNames.forEach(company => {
        companiesToCreate.push(function(callback) { createCompany(company, callback) });
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
    for (let i = 0; i < 15; i++) {

        let profession = professions[getRandomIndex(professions.length)]
        let payBase = getRandomIndex(payBases.length)

        let details = {
            title: professionTypes[profession.name][getRandomIndex(professionTypes[profession.name].length)],
            headliner: faker.lorem.sentence(),
            summary: faker.lorem.lines(3),
            description: faker.lorem.paragraphs(3),
            company: companies[getRandomIndex(companies.length)],
            city: cities[getRandomIndex(cities.length)],
            suburb: suburbs[getRandomIndex(suburbs.length)],
            industry: industry._id,
            profession: profession._id,
            workType: workTypes[getRandomIndex(workTypes.length)],
            payBase: payBases[payBase],
            payCeiling: payBases[getRandomIndex(payBases.length - payBase) + payBase]
        }
        jobsToCreate.push(function(callback) { createJob(details, callback) });
    }

    async.series(jobsToCreate, callback);

}

function getRandomIndex(length) {
    return Math.floor(Math.random() * length);
}

console.log('[INFO] Populating database...');

async.series([populateUsers, populateCompanies, populateIndustries, populateProfessions, populateJobs], (err) => {

    if (err) {
        console.log(`[ERROR] ${err}`);
    }
    else {
        console.log('[INFO] Data successfully loaded!');
    }
    mongoose.connection.close();

});
