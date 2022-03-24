const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
let database;

const User = require('../src/user/user.model');
const bcrypt = require('bcryptjs');

exports.connect = async () => {
    database = await MongoMemoryServer.create();
    const uri = database.getUri();
    await mongoose.connect(uri);
}

exports.disconnect = async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.disconnect();
    await database.stop();
}

exports.seed = async () => {

    await User.create({
        firstName: 'John',
        lastName: 'Smith',
        email: 'jsmith@email.com',
        location: 'Melbourne',
        password: await bcrypt.hash('password', 10),
        phone: '01234567890'
    })    

}
