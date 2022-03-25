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

    test('createUser', () => {
        const createUser = `
            mutation createUser($firstName: String!, $lastName: String!, $email: String!, $location: String!, $password: String!, $phone: String) {
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
        const login = `
            mutation login($email: String!, $password: String!) {
                login(email: $email, password: $password) {
                    token
                    user {
                        email
                    }
                }
            }
        `
        tester.test(true, login, {
            email: 'jsmith@email.com',
            password: 'password'
        })
    })

    test('updateUser', () => {
        const updateUser = `
            mutation updateUser($id: ID!, $firstName: String!, $lastName: String!, $location: String!, $phone: String) {
                updateUser(id: $id, firstName: $firstName, lastName: $lastName, location: $location, phone: $phone) {
                    firstName
                    lastName
                    location
                    phone
                }
            }
        `
        tester.test(true, updateUser, {
            id: 'abc',
            firstName: 'John',
            lastName: 'Smith',
            location: 'Sydney',
            phone: '0123456789'
        })
    })

    test('updateEmail', () => {
        const updateEmail = `
        `
    })

    test('updatePassword', () => {

    })

    test('deleteUser', () => {

    })

})

describe.skip('user resolvers', () => {

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
        const createUser = `
            mutation createUser($firstName: String!, $lastName: String!, $email: String!, $location: String!, $password: String!, $phone: String) {
                createUser(firstName: $firstName, lastName: $lastName, email: $email, location: $location, password: $password, phone: $phone) {
                    firstName
                    lastName
                    email
                }
            }
        `
        const result = tester.graphql(createUser, {}, {}, {
            firstName: 'John',
            lastName: 'Smith,',
            email: 'jsmith@email.com',
            location: 'Melbourne',
            password: 'password',
            phone: '0123456789'
        })        
        console.log(result);
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