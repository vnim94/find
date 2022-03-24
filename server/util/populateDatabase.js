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

let users = [];

function getRandomIndex(array) {
    return Math.floor(Math.random() * array.length);
}

function createUser(firstName, lastName, email, location, password, phone, callback) {

    let details = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        location: location,
        password: bcrypt.hashSync(password, 10),
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
  
function populateUsers(callback) {

    let usersToCreate = [];

    for (let i = 0; i < 5; i++) {
        usersToCreate.push(function(callback) { createUser(faker.name.firstName(), faker.name.lastName(), faker.internet.email(), faker.address.city(), faker.internet.password(), faker.phone.phoneNumber(),callback) });
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
