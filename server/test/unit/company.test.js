const { typeDefs, resolvers } = require('../../src/api/schema');
const EasyGraphQLTester = require('easygraphql-tester');
const tester = new EasyGraphQLTester(typeDefs, resolvers);

describe('company queries', () => {
    test('company', () => {

    })

    test('companies', () => {

    })
})

describe('company mutations', () => {
    test('createCompany', () => {

    })
    
    test('updateCompany', () => {

    })

    test('deleteCompany',  () => {

    })
})

describe.only('company resolvers', () => {

    const database = require('../../util/memoryDatabase');
    const Company = require('../../src/company/company.model');
    let context;
    let company;

    beforeAll(async () => {
        await database.connect();
        await database.seed();
        company = await Company.findOne();
        context = { user: 'abc' };
    });

    afterAll(async () => { await database.disconnect() });

    test('company', async () => {
        const companyQuery = `
            {
                company(id: "${company._id.toString()}") {
                    ... on Company {
                        id
                        name
                        headquarters
                        overview
                        averageRating
                        size
                    }
                }
            }
        `
        const result = await tester.graphql(companyQuery, {}, {}, {});
        expect(result.data.company.name).toBe('McDonalds');
        expect(result.data.company.headquarters).toBe('123 ABC Street');
    })

    test('company not found', async () => {
        
    })

    test('companies', async () => {
        const companies = `
            {
                companies {
                    id
                    name
                    headquarters
                    overview
                    averageRating
                    size
                }
            }
        `
        const result = await tester.graphql(companies, {}, {}, {});
        expect(result.data.companies[0].name).toBe('McDonalds');
        expect(result.data.companies[0].headquarters).toBe('123 ABC Street');
    })

    test('createCompany', async () => {
        const createCompany = `
            mutation {
                createCompany(name: "ABC", headquarters: "123 Street") {
                    ... on Company {
                        id
                        name
                        headquarters
                    }
                }
            }
        `
        const result = await tester.graphql(createCompany, {}, context, {});
        expect(result.data.createCompany.id).toBeTruthy();
        expect(result.data.createCompany.name).toBe('ABC');
        expect(result.data.createCompany.headquarters).toBe('123 Street');

        const createdCompany = await Company.findOne({ name: 'ABC' });
        expect(createdCompany).toBeTruthy();
    })

    test('createCompany that already exists', async () => {
        const createCompany = `
            mutation {
                createCompany(name: "McDonalds", headquarters: "123 Street") {
                    ... on CompanyExists {
                        message
                        name
                    }
                }
            }
        `
        const result = await tester.graphql(createCompany, {}, context, {});
        expect(result.data.createCompany.message).toBe('Company already exists');
        expect(result.data.createCompany.name).toBe('McDonalds');
    })

    test('createCompany with invalid input', async () => {

    })

    test('updateCompany', async () => {
        const updateCompany = `
            mutation {
                updateCompany(id: "${company._id.toString()}", name: "updated", headquarters: "XYZ Street") {
                    ... on Company {
                        id
                        name
                        headquarters
                    }
                }
            }
        `
        const result = await tester.graphql(updateCompany, {}, context, {});
        expect(result.data.updateCompany.name).toBe('updated');
        expect(result.data.updateCompany.headquarters).toBe('XYZ Street');

        const updatedCompany = await Company.findOne({ name: 'updated' });
        expect(updatedCompany).toBeTruthy();
    })

    test('updateCompany with name taken', async () => {

    })

    test('updateCompany with invalid input', async () => {

    })

    test('deleteCompany', async () => {
        const deleteCompany = `
            mutation {
                deleteCompany(id: "${company._id.toString()}") {
                    ... on Company {
                        id
                    }
                }
            }
        `
        const result = await tester.graphql(deleteCompany, {}, context, {});
        expect(result.data.deleteCompany.id).toBeTruthy();

        const deletedCompany = await Company.findById(company._id.toString());
        expect(deletedCompany).toBeFalsy();
    })
})