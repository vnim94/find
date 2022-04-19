const app = require('../../app');
const request = require('supertest')(app);
const database = require('../../util/memoryDatabase');

const Industry = require('../../src/job/industry.model');

let industryA;
let industryB;

beforeAll(async () => {
    await database.connect();
    await database.seed();
    industryA = await Industry.findOne({ code: '0001' });
    industryB = await Industry.findOne({ code: '0000' });
});

afterAll(async () => { await database.disconnect() });

describe('job queries', () => {
    const jobsQuery = `
        query jobsQuery($title: String, $company: ID, $city: String, $suburb: String, $industry: [ID], $profession: [ID], $workType: [String], $payBase: Int, $payCeiling: Int) {
            jobs(title: $title, company: $company, city: $city, suburb: $suburb, industry: $industry, profession: $profession, workType: $workType, payBase: $payBase, payCeiling: $payCeiling) {
                id
                title
                headliner
                summary
                description
                company {
                    id
                    name
                }
                city
                suburb
                industry {
                    id
                    name
                    code
                }
                profession {
                    id
                    name
                    code
                }
                workType
                added
            }
        }
    `
    
    test('jobs query with no parameters', async () => {
        const variables = {}
        const response = await request.post('/api')
            .send({
                query: jobsQuery,
                variables
            })

        expect(response.body.data.jobs).toBeTruthy();
        expect(response.body.data.jobs.length).toBe(2);
    })

    test('jobs query with multiple parameters', async () => {
        const variables = {
            industry: [industryA._id.toString()],
        }
        const response = await request.post('/api')
            .send({
                query: jobsQuery,
                variables: variables
            })
        expect(response.body.data.jobs).toBeTruthy();
        expect(response.body.data.jobs.length).toBe(1);
    })
})