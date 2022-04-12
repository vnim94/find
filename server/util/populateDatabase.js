#! /usr/bin/env node
require('dotenv').config();
const { faker } = require('@faker-js/faker');
const mongoose = require('mongoose');
const async = require('async');

const User = require('../src/user/user.model');

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

const suburbs = ['CBD', 'Inner Suburbs', 'Outer Suburbs']

const companies = [
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
  
function createCompany(name, headquarters) {

}

function createJob() {

}

function populateUsers(callback) {

    let usersToCreate = [];

    for (let i = 0; i < 5; i++) {
        let firstName = faker.name.firstName();
        let lastName = faker.name.lastName();
        let email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@email.com`
        usersToCreate.push(function(callback) { createUser(firstName, lastName, email, locations[getRandomIndex(locations.length)], 'password', faker.phone.phoneNumber(),callback) });
    }

    async.series(usersToCreate, callback);

}

function populateCompanies(callback) {

}

function populateJobs(callback) {

}

function getRandomIndex(length) {
    return Math.floor(Math.random() * length);
}

console.log('[INFO] Populating database...');

async.series([populateUsers], (err) => {

    if (err) {
        console.log(`[ERROR] ${err}`);
    }
    else {
        console.log('[INFO] Data successfully loaded!');
    }
    mongoose.connection.close();

});
