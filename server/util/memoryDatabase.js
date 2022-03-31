const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
let database;

const User = require('../src/user/user.model');
const Company = require('../src/company/company.model');
const Job = require('../src/job/job.model');
const Review = require('../src/review/review.model');
const App = require('../src/app/app.model');

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

    const user = await User.create({
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

    const job = await Job.create({
        title: 'burger flipper',
        description: 'flip stuff',
        company: company._id,
        city: 'Melbourne',
        industry: 'Fast Food',
        profession: 'Burger Flipper',
        workType: 'Full time'
    })

    await Review.create({
        title: 'Great place to work',
        user: user._id,
        company: company._id,
        benefits: 5.0,
        career: 5.0,
        balance: 5.0,
        environment: 5.0,
        management: 5.0,
        diversity: 5.0,
        good: 'free burgers',
        bad: 'low pay',
        role: 'burger flipper',
        location: 'Victoria',
        recommend: true,
        salary: 'Low'
    })

    await App.create({
        applicant: user._id,
        job: job._id,
        resume: 'attached resume',
        letter: 'attached letter'
    })
}
