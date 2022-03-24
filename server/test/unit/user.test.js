const User = require('../../src/user/user.model');
const typeDefs = require('../../src/api/typeDefs');
const resolvers = require('../../src/api/resolvers');
const EasyGraphQLTester = require('easygraphql-tester');
const tester = new EasyGraphQLTester(typeDefs, resolvers);

describe('user typeDefs', () => {

    test('getUsers', () => {
        const query = `
            {
                getUsers {
                    firstName
                    lastName
                    email
                }
            }
        `

        tester.test(true, query)
    })

    test('invalid getUsers', () => {
        const query = `
            {
                getUsers {
                    dob
                }
            }
        `

        tester.test(false, query)
    })

})