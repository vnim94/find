const { typeDefs, resolvers } = require('../../src/api/schema');
const EasyGraphQLTester = require('easygraphql-tester');
const tester = new EasyGraphQLTester(typeDefs, resolvers);

const database = require('../../util/memoryDatabase');
const User = require('../../src/user/user.model');
const Company = require('../../src/company/company.model');
const Job = require('../../src/job/job.model');
const App = require('../../src/app/app.model');

let context;
let user;
let company;
let job;
let app;

beforeAll(async () => {
    await database.connect();
    await database.seed();
    user = await User.findOne();
    company = await Company.findOne();
    job = await Job.findOne();
    app = await App.findOne();
    context = { user: 'abc' };
});

afterAll(async () => { await database.disconnect() });

describe('app queries', () => {
    test('app', async () => {
        const query = `
            {
                app(id: "${app._id.toString()}") {
                    ... on App {
                        applicant {
                            fullName
                        }
                        job {
                            title
                            company {
                                name
                            }
                        }
                        resume
                        letter
                        status
                    }
                }
            }
        `
        const result = await tester.graphql(query, {}, {}, {});
        expect(result.data.app.applicant.fullName).toBe('John Smith');
        expect(result.data.app.job.company.name).toBe('McDonalds');
    })

    test('apps', async () => {
        const query = `
            {
                apps {
                    applicant {
                        fullName
                    }
                    job {
                        title
                        company {
                            name
                        }
                    }
                    resume
                    letter
                    status
                }
            }
        `
        const result = await tester.graphql(query, {}, {}, {});
        expect(result.data.apps[0].applicant.fullName).toBe('John Smith');
        expect(result.data.apps[0].job.company.name).toBe('McDonalds');
    })
})

describe('app mutations', () => {
    test('createApp', async () => {
        const newJob = await Job.create({
            title: 'floor mopper',
            description: 'mop stuff',
            company: company._id,
            city: 'Melbourne',
            industry: 'Fast Food',
            profession: 'Floor mopper',
            workType: 'Full time'
        })
        
        const createApp = `
            mutation {
                createApp(applicant: "${user._id.toString()}", job: "${newJob._id.toString()}", resume: "attached resume", letter: "attached letter") {
                    applicant {
                        fullName
                    }
                    job {
                        title
                        company {
                            name
                        }
                    }
                    resume
                    letter
                    status
                }
            }
        `
        const result = await tester.graphql(createApp, {}, context, {});
        expect(result.data.createApp.applicant.fullName).toBe('John Smith');
        expect(result.data.createApp.job.title).toBe('floor mopper');
        
        const newApp = await App.findOne({ applicant: user._id.toString(), job: newJob._id.toString() });
        expect(newApp).toBeTruthy();
    })

    test('updateApp', async () => {
        const updateApp = `
            mutation {
                updateApp(id: "${app._id.toString()}", resume: "new resume", letter: "new letter") {
                    ... on App {
                        applicant {
                            fullName
                        }
                        job {
                            title
                            company {
                                name
                            }
                        }
                        resume
                        letter
                        status
                    }
                }
            }
        `
        const result = await tester.graphql(updateApp, {}, context, {});
        expect(result.data.updateApp.applicant.fullName).toBe('John Smith');
        expect(result.data.updateApp.job.title).toBe('burger flipper');
        
        const updatedApp = await App.findById(app._id);
        expect(updatedApp.resume).toBe('new resume');
        expect(updatedApp.letter).toBe('new letter');
    })

    test('deleteApp', async () => {

    })
})