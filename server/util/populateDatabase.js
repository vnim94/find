#! /usr/bin/env node
require('dotenv').config();
const { faker } = require('@faker-js/faker');
const mongoose = require('mongoose');
const async = require('async');
const bcrypt = require('bcryptjs');

const User = require('../src/user/user.model');

mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true });
const database = mongoose.connection;
database.once('open', () => console.log('[INFO] Successfully connected to database'));
database.on('error', console.error.bind(console, 'Error connecting to database'));

let locations = [
    'Melbourne',
    'Sydney',
    'Brisbane',
    'Perth',
    'Hobart',
    'Darwin',
    'Adelaide'
];

function getRandomIndex(length) {
    return Math.floor(Math.random() * length);
}

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
