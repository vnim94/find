const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
let database;

const User = require('../src/user/user.model');
const Location = require('../src/job/location.model');
const Company = require('../src/company/company.model');
const Job = require('../src/job/job.model');
const Industry = require('../src/job/industry.model');
const Profession = require('../src/job/profession.model');
const Review = require('../src/review/review.model');

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

    const locationA = await Location.create({
        suburb: 'CBD',
        city: 'Melbourne',
        state: 'VIC',
        region: 'Australia'
    })

    const locationB = await Location.create({
        suburb: 'CBD',
        city: 'Sydney',
        state: 'NSW',
        region: 'Australia'
    })

    const industryA = await Industry.create({
        name: 'Hospitality & Tourism',
        code: '0000'
    })

    const industryB = await Industry.create({
        name: 'Retail & Consumer Products',
        code: '0001'
    })

    const companyA = await Company.create({
        name: "McDonalds",
        website: 'mcdonalds.com',
        industry: industryA._id,
        headquarters: '123 ABC Street',
        overview: "overview",
        size: 'More than 10,001'
    })

    const companyB = await Company.create({
        name: "Hungry Jacks",
        website: 'hungryjacks.com',
        industry: industryA._id,
        headquarters: '987 XYZ Street',
        overview: "overview",
        size: 'More than 10,001'
    })

    const professionA = await Profession.create({
        name: 'Chefs/Cooks',
        industry: industryA._id,
        code: '0000'
    })

    const professionB = await Profession.create({
        name: 'Manager',
        industry: industryB._id,
        code: '0001'
    })

    await Job.create({
        title: 'burger flipper',
        headliner: 'great opportunity to flip stuff',
        summary: 'this is a job for flipping burgers',
        description: 'flip stuff',
        company: companyA._id,
        location: locationA._id,
        industry: industryA._id,
        profession: professionA._id,
        workType: 'Full time',
        payBase: 35000
    })

    await Job.create({
        title: 'manager',
        headliner: 'manage stuff',
        summary: 'this is a job to manage things',
        description: 'manage things',
        company: companyB._id,
        location: locationB._id,
        industry: industryB._id,
        profession: professionB._id,
        workType: 'Part time',
        payBase: 70000,
        payCeiling: 85000
    })

    await Review.create({
        title: 'Great place to work',
        user: user._id,
        company: companyA._id,
        ratings: {
            benefits: 5.0,
            career: 5.0,
            balance: 5.0,
            environment: 5.0,
            management: 5.0,
            diversity: 5.0
        },
        good: 'free burgers',
        bad: 'low pay',
        role: 'burger flipper',
        location: locationA._id,
        recommend: true,
        salary: 'Average'
    })

    const reviews = await Review.aggregate([
        { $match: { company: companyA._id } },
        { $group: { _id: '$company' , averageRating: { $avg: '$ratings.average' }, totalCount: { $count: {} } } },
    ])
    if (reviews.length > 0) await Company.findByIdAndUpdate(companyA._id, { 
        reviews: {
            averageRating: reviews[0].averageRating,
            totalCount: reviews[0].totalCount 
        }
    });
}
