#! /usr/bin/env node
require('dotenv').config();
const { faker } = require('@faker-js/faker');
const mongoose = require('mongoose');
const async = require('async');

const User = require('../src/user/user.model');
const Company = require('../src/company/company.model');
const Job = require('../src/job/job.model');

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

const suburbs = ['CBD', 'Inner Suburbs', 'Inner West Suburbs', 'Inner East Suburbs', 'Western Suburbs', 'Eastern Suburbs', 'Southern Suburbs', 'Northern Suburbs']

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

let companies = [];

const workTypes = [
    'Full time',
    'Part time',
    'Contract/Temp',
    'Casual/Vacation'
];

const industries = [
    'Accounting',
    'Administration & Office Support',
    'Advertising, Arts & Media',
    'Banking & Financial Services',
    'Call Centre & Customer Service',
    'CEO & General Management',
    'Community Services & Development',
    'Construction',
    'Consulting & Strategy',
    'Design & Architecture',
    'Education & Training',
    'Engineering',
    'Farming, Animals & Conservation',
    'Government & Defence',
    'Healthcare & Medical',
    'Hospitality & Tourism',
    'Human Resources & Recruitment',
    'Information & Communication Technology',
    'Insurance & Superannuation',
    'Legal',
    'Manufacturing, Transport & Logistics',
    'Marketing & Communications',
    'Mining, Resources & Energy',
    'Real Estate & Property',
    'Retail & Consumer Products',
    'Sales',
    'Science & Technology',
    'Self Employment',
    'Sport & Recreation',
    'Trades & Services'
];

const professions = {
    'Architects': ['Software Architect'],
    'Business/System Analysts': ['Business Analyst'],
    'Developers/Programmers': ['Software Developer', 'Software Engineer', 'Web Developer', 'Tech Lead'],
    'Testing & Quality Assurance': ['QA Analyst', 'Test Engineer', 'Test Automation Lead'],
    'Product Management & Development': ['Product Manager'],
    'Network & Systems Administration': ['Network Engineer', 'System Administrator'],
    'Database Development & Administration': ['Database Consultant', 'Database Administrator']
};

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

function createJob(details, callback) {

    let job = new Job(details);

    job.save((err) => {
        if (err) {
            console.log(`[ERROR] Error creating job: ${job.title}-${job.company.name} - ${err}`);
            callback(err, null);
            return;
        }

        console.log(`[INFO] New job created: ${job.title}-${job.company.name}`);
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

function populateJobs(callback) {

    let jobsToCreate = [];

    for (let i = 0; i < 15; i++) {

        let profession = Object.keys(professions)[getRandomIndex(Object.keys(professions).length)];

        let details = {
            title: professions[profession][getRandomIndex(professions[profession].length)],
            headliner: faker.lorem.sentence(),
            summary: faker.lorem.lines(3),
            description: faker.lorem.paragraphs(3),
            company: companies[getRandomIndex(companies.length)],
            city: cities[getRandomIndex(cities.length)],
            suburb: suburbs[getRandomIndex(suburbs.length)],
            industry: 'Information & Communication Technology',
            profession: profession,
            workType: workTypes[getRandomIndex(workTypes.length)]
        }
        jobsToCreate.push(function(callback) { createJob(details, callback) });
    }

    async.series(jobsToCreate, callback);

}

function getRandomIndex(length) {
    return Math.floor(Math.random() * length);
}

console.log('[INFO] Populating database...');

async.series([populateUsers, populateCompanies, populateJobs], (err) => {

    if (err) {
        console.log(`[ERROR] ${err}`);
    }
    else {
        console.log('[INFO] Data successfully loaded!');
    }
    mongoose.connection.close();

});
