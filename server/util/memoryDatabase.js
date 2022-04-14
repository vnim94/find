const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
let database;

const User = require('../src/user/user.model');
const Company = require('../src/company/company.model');
const Job = require('../src/job/job.model');

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
        password: 'password',
        phone: '01234567890'
    })    

    const company = await Company.create({
        name: "McDonalds",
        headquarters: '123 ABC Street',
        overview: "overview",
        averageRating: 3.4,
        size: 'More than 10,001'
    })

    await Job.create({
        title: 'burger flipper',
        headliner: 'great opportunity to flip stuff',
        summary: 'this is a job for flipping burgers',
        description: 'flip stuff',
        company: company._id,
        city: 'Melbourne',
        suburb: 'CBD',
        industry: 'Fast Food',
        profession: 'Burger Flipper',
        workType: 'Full time'
    })

}
