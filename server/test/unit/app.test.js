const { typeDefs, resolvers } = require('../../src/api/schema');
const EasyGraphQLTester = require('easygraphql-tester');
const tester = new EasyGraphQLTester(typeDefs, resolvers);

const database = require('../../util/memoryDatabase');
const User = require('../../src/user/user.model');
const Job = require('../../src/job/job.model');
const App = require('../../src/app/app.model');

let context;
let user;
let job;
let app;

beforeAll(async () => {
    await database.connect();
    await database.seed();
    user = await User.findOne();
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
        console.log(result)
        expect(result.data.app.applicant.fullName).toBe('John Smith');
        expect(result.data.app.job.company).toBe('McDonalds');
    })

    test('apps', async () => {

    })
})

describe('app mutations', () => {

})