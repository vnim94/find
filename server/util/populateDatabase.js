#! /usr/bin/env node
require('dotenv').config();
const fake = require('@faker-js/faker').faker;
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

async function createUser(name, email, password, callback) {

    details = {
        name: name,
		email: email,
        password: await bcrypt.hash(password, 10)
    }

    let user = new User(details);
         
    user.save((err) => {

        if (err) {
            console.log(`[ERROR] Error creating user: ${user.name} - ${err}`);
            callback(err, null);
            return;
        }

        console.log(`[INFO] New user created: ${user.name}`);
        users.push(user);
        callback(null, user);

    });

}
  
function populateUsers(callback) {

    let usersToCreate = [];

    for (let i = 0; i < 5; i++) {
        usersToCreate.push(function(callback) { createUser(fake.name.findName(), fake.internet.email(), fake.internet.password(), callback) });
    }

    async.series(usersToCreate, callback);

}

console.log('[INFO] Populating database...');

async.series([populateUsers], (err, results) => {

    if (err) {
        console.log(`[ERROR] ${err}`);
    }
    else {
        console.log('[INFO] Data successfully loaded!');
    }
    mongoose.connection.close();

});
