const UserTypes = require('../../src/user/user.types');
const UserResolvers = require('../../src/user/user.resolvers');
const EasyGraphQLTester = require('easygraphql-tester');
const tester = new EasyGraphQLTester(UserTypes, UserResolvers);

describe('user queries', () => {
    
    test('valid users query', () => {
        const query = `
            {
                users {
                    firstName
                    lastName
                    email
                    location
                    password
                    phone
                }
            }
        `
        tester.test(true, query);
        
    })

    test('invalid users', () => {
        const query = `
            {
                users {
                    dob
                }
            }
        `

        tester.test(false, query);
    })

    test('user', () => {
        const query = `
            {
                user(id: "user_id") {
                    firstName
                    lastName
                    email
                }
            }
        `

        tester.test(true, query);
    })  

    test('invalid user', () => {
        const query = `
            {
                user(id: "user_id") {
                    dob
                }
            }
        `

        tester.test(false, query);
    })

})

describe('user mutations', () => {

    test.only('createUser', () => {
        const createUser = `
            mutation createUser($firstName: String!, $lastName: String!, $email: String!, $location: String!, $password: String!, $phone: String!) {
                createUser(firstName: $firstName, lastName: $lastName, email: $email, location: $location, password: $password, phone: $phone) {
                    firstName
                    lastName
                    email
                }
            }
        `

        tester.test(true, createUser, {
            firstName: 'John',
            lastName: 'Smith,',
            email: 'jsmith@email.com',
            location: 'Melbourne',
            password: 'password',
            phone: '0123456789'
        })
    })

    test('login', () => {

    })

    test('updateUser', () => {

    })

    test('updateEmail', () => {

    })

    test('updatePassword', () => {

    })

    test('deleteUser', () => {

    })

})

describe('user resolvers', () => {

    const database = require('../../util/memoryDatabase');
    const User = require('../../src/user/user.model');

    let user;

    beforeAll(async () => {
        await database.connect();
        await database.seed();
        user = await User.findOne();
    });

    afterAll(async () => { await database.disconnect() });

    test('user', async () => {
        const query = `
            {
                user(id: "${user._id.toString()}") {
                    firstName
                    lastName
                    email
                }
            }
        `
        const result = await tester.graphql(query, {}, {}, {});
        expect(result.data.user).toBeTruthy();

        const { firstName, lastName, email } = result.data.user
        expect(firstName).toBe('John');
        expect(lastName).toBe('Smith');
        expect(email).toBe('jsmith@email.com');
    })

    test('users', async () => {
        const query = `
            {
                users {
                    firstName
                    lastName
                    email
                }
            }
        `
        const result = await tester.graphql(query, {}, {}, {});

        expect(result.data.users.length).toBe(1);
        expect(result.data.users[0].firstName).toBe('John');
        expect(result.data.users[0].lastName).toBe('Smith');
        expect(result.data.users[0].email).toBe('jsmith@email.com');
    })

    test('createUser', async () => {

    })

    test('login', async () => {

    })

    test('updateUser', async () => {

    })

    test('updateEmail', async () => {

    })

    test('updatePassword', async () => {

    })

    test('deleteUser', async () => {

    })

})