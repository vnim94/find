const app = require('../../app');
const request = require('supertest')(app);

const database = require('../../util/memoryDatabase');

beforeAll(async () => {
    await database.connect();
    await database.seed();
});

afterAll(async () => { await database.disconnect() });

describe('job queries', () => {
    const jobsQuery = `
        query jobs($title: String, $company: ID, $city: String, $suburb: String, $industry: [ID], $profession: [ID], $workType: String, $payBase: Int, $payCeiling: Int) {
            jobs(title: $title, company: $company, city: $city, suburb: $suburb, industry: $industry, profession: $profession, workType: $workType, payBase: $payBase, payCeiling: $payCeiling) {
                id
                title
                headliner
                summary
                description
                company {
                    name
                }
                city
                suburb
                industry {
                    name
                    code
                }
                profession {
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
    })
})