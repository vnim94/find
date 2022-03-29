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
    test('job', async () => {
        const query = `
            {
                job(id: "${job._id.toString()}") {
                    ... on Job {
                        title
                        description
                        company {
                            name
                        }
                    }
                }
            }
        `
        const result = await tester.graphql(query, {}, {}, {});
        expect(result.data.job.title).toBe('burger flipper');
        expect(result.data.job.description).toBe('flip stuff');
        expect(result.data.job.company.name).toBe('McDonalds');
    })

    test('job not found', async () => {
        const query = `
            {
                job(id: "6242943990b42b3aa078d5d2") {
                    ... on NotFound {
                        message
                        id
                    }
                }
            }
        `
        const result = await tester.graphql(query, {}, {}, {});
        expect(result.data.job.message).toBe('Job not found');
        expect(result.data.job.id).toBeTruthy();
    })

    test('jobs', async () => {
        const query = `
            {
                jobs {
                    title
                    description
                    company {
                        name
                    }
                }
            }
        `
        const result = await tester.graphql(query, {}, {}, {});
        expect(result.data.jobs).toBeTruthy();
        expect(result.data.jobs[0].title).toBe('burger flipper');
        expect(result.data.jobs[0].company.name).toBe('McDonalds');
    })
})

describe('job mutations', () => {
    test('createJob', async () => {
        const createJob = `
            mutation {
                createJob(title: "manager", description: "manage stuff", company: "${company._id.toString()}", city: "Melbourne", industry: "Fast Food", profession: "Management", workType: "Full time") {
                    ... on Job {
                        id
                        title
                        description
                        company {
                            name
                        }
                    }
                }
            }
        `
        const result = await tester.graphql(createJob, {}, context, {});
        expect(result.data.createJob.title).toBe('manager');
        expect(result.data.createJob.company.name).toBe('McDonalds');

        const newJob = await Job.findById(result.data.createJob.id);
        expect(newJob).toBeTruthy();
    })

    test('updateJob', async () => {
        const updateJob = `
            mutation {
                updateJob(id: "${job._id.toString()}", title: "updated", description: "updated", city: "Sydney", industry: "FMCG", profession: "Executive", workType: "Part time") {
                    ... on Job {
                        title
                        description
                        city
                        industry
                        profession
                        workType
                    }
                }
            }
        `
        const result = await tester.graphql(updateJob, {}, context, {});
        expect(result.data.updateJob.title).toBe('updated');
        expect(result.data.updateJob.description).toBe('updated');

        const updatedJob = await Job.findById(job._id.toString());
        expect(updatedJob.title).toBe('updated');
    })

    test('closeJob', async () => {

    })

    test('deleteJob', async () => {

    })
})

describe('job resolvers', () => {
})