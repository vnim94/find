const UserTypes = require('../../src/user/user.types');
const UserResolvers = require('../../src/user/user.resolvers');
const EasyGraphQLTester = require('easygraphql-tester');
const tester = new EasyGraphQLTester(UserTypes, UserResolvers);

describe('user queries', () => {
    
    test.only('getUsers', async () => {
        const query = `
            {
                getUsers {
                    firstName
                    lastName
                    email
                }
            }
        `

        tester.test(true, query);
    })

    test('invalid getUsers', () => {
        const query = `
            {
                getUsers {
                    dob
                }
            }
        `

        tester.test(false, query);
    })

    test('getUser', () => {
        const query = `
            {
                getUser(id: "user_id") {
                    firstName
                    lastName
                    email
                }
            }
        `

        tester.test(true, query);
    })  

    test('invalid getUser', () => {
        const query = `
            {
                getUser(id: "user_id") {
                    dob
                }
            }
        `

        tester.test(false, query);
    })

})