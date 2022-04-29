const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
let database;

const User = require('../src/user/user.model');
const Location = require('../src/job/location.model');
const Company = require('../src/company/company.model');
const Job = require('../src/job/job.model');
const Industry = require('../src/job/industry.model');
const Profession = require('../src/job/profession.model');

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
        averageRating: 3.4,
        size: 'More than 10,001'
    })

    const companyB = await Company.create({
        name: "Hungry Jacks",
        website: 'hungryjacks.com',
        industry: industryA._id,
        headquarters: '987 XYZ Street',
        overview: "overview",
        averageRating: 3.4,
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

}
