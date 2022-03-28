const Job = require('../../src/job/job.model');
const database = require('../../util/memoryDatabase');
const Company = require('../../src/company/company.model');
const { typeDefs, resolvers } = require('../../src/api/schema');
const EasyGraphQLTester = require('easygraphql-tester');
const tester = new EasyGraphQLTester(typeDefs, resolvers);

let context;
let company;
let job;

beforeAll(async () => {
    await database.connect();
    await database.seed();
    company = await Company.findOne();
    job = await Job.findOne();
    context = { user: 'abc' };
});

afterAll(async () => { await database.disconnect() });

describe('job model', () => {
    test('added should be current date', () => {
        expect(job.added.toDateString()).toBe(new Date().toDateString());
    })

    test('closing should be current date + 30 days', () => {
        const today = new Date();
        const expiry = new Date();
        expiry.setDate(today.getDate() + 30)
        expect(job.closing.toDateString()).toBe(expiry.toDateString())
    })
})

describe('job queries', () => {

})

describe('job mutations', () => {

})

describe('job resolvers', () => {
    test('')
})