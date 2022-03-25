const { typeDefs, resolvers } = require('../../src/api/schema');
const EasyGraphQLTester = require('easygraphql-tester');
const tester = new EasyGraphQLTester(typeDefs, resolvers);

describe('user queries', () => {
    
    test('valid users query', () => {
        const query = `
            {
                users {
                    ... on User {
                        firstName
                        lastName
                        email
                        location
                        password
                        phone
                    }
                    ... on UserError {
                        message
                    }
                }
            }
        `
        tester.test(true, query);
        
    })

    test('invalid users', () => {
        const query = `
            {
                users {
                    ... on User { 
                        dob
                    }
                    ... on UserError {
                        message
                    }
                }
            }
        `

        tester.test(false, query);
    })

    test('user', () => {
        const query = `
            {
                user(id: "user_id") {
                    ... on User {
                        firstName
                        lastName
                        email
                    }
                    ... on UserError {
                        message
                    }
                }
            }
        `

        tester.test(true, query);
    })  

    test('invalid user', () => {
        const query = `
            {
                user(id: "user_id") {
                    ... on User {
                        dob
                    }
                    ... on UserError {
                        message
                    }
                }
            }
        `

        tester.test(false, query);
    })

})

describe('user mutations', () => {

    test('createUser', () => {
        const createUser = `
            mutation {
                createUser(firstName: "John", lastName: "Smith", email: "jsmith@email.com", location: "Melbourne", password: "password", phone: "0123456789") {
                    ... on User {
                        firstName
                        lastName
                        email
                    }
                    ... on Error {
                        message
                    }
                }
            }
        `

        tester.test(true, createUser)
    })

    test('login', () => {
        const login = `
            mutation {
                login(email: "jsmith@email.com", password: "password") {
                    ... on AuthPayload {
                        token
                        user {
                            email
                        }
                    }
                    ... on Error {
                        message
                    }
                }
            }
        `
        tester.test(true, login)
    })

    test('updateUser', () => {
        const updateUser = `
            mutation {
                updateUser(id: "abc", firstName: "John", lastName: "Smith", location: "Sydney", phone: "0123456789") {
                    ... on User {
                       firstName
                        lastName
                        location
                        phone 
                    }
                    ... on Error {
                        message
                    }
                }
            }
        `
        tester.test(true, updateUser)
    })

    test('updateEmail', () => {
        const updateEmail = `
            mutation {
                updateEmail(id: "abc", email: "updated@email.com") {
                    ... on User {
                        id
                        email
                    }
                    ... on Error {
                        message
                    }
                }
            }
        `
        tester.test(true, updateEmail)
    })

    test('updatePassword', () => {
        const updatePassword = `
            mutation {
                updatePassword(id: "abc", password: "updated") {
                    ... on User {
                        id
                    }
                    ... on Error {
                        message
                    }
                }
            }
        `
        tester.test(true, updatePassword)
    })

    test('deleteUser', () => {
        const deleteUser = `
            mutation {
                deleteUser(id: "abc") {
                    ... on User {
                        id
                    }
                    ... on Error {
                        message
                    }
                }
            }
        `
        tester.test(true, deleteUser)
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
                    ... on User {
                        firstName
                        lastName
                        email
                    }
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
                    ... on User {
                        firstName
                        lastName
                        email
                    }
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
            mutation {
                createUser(firstName: "Bob", lastName: "Brown", email: "bbrown@email.com", location: "Melbourne", password: "password", phone: "0123456789") {
                    ... on User {
                        firstName
                        lastName
                        email
                        location
                    }
                }
            }
        `
        const result = await tester.graphql(createUser, {}, {}, {})     
        expect(result.data.createUser).toBeTruthy();

        const { firstName, lastName, email, location } = result.data.createUser
        expect(firstName).toBe('Bob');
        expect(lastName).toBe('Brown');
        expect(email).toBe('bbrown@email.com');
        expect(location).toBe('Melbourne');

        const newUser = await User.findOne({ email: "bbrown@email.com" });
        expect(newUser).toBeTruthy();
    })

    test('createUser error', async () => {
        const createUser = `
            mutation {
                createUser(firstName: "", lastName: "", email: "", location: "", password: "", phone: "") {
                    ... on UserError {
                        message
                        firstName
                        lastName
                        email
                        location
                        password
                        phone
                    }
                }
            }
        `
        const result = await tester.graphql(createUser, {}, {}, {})
        expect(result.data.createUser.message).toBeTruthy();
        expect(result.data.createUser.message).toBe('error creating user');
    })

    test('login', async () => {
        const login = `
            mutation {
                login(email: "jsmith@email.com", password: "password") {
                    token
                    user {
                        email
                    }
                }
            }
        `
        const result = await tester.graphql(login, {}, {}, {})
        expect(result.data.login.token).toBeTruthy();
        expect(result.data.login.user).toBeTruthy();
    })

    test('login with invalid credentials', async () => {
        const login = `
            mutation {
                login(email: "abc@email.com", password: "password") {
                    ... on AuthPayload {
                        token
                        user {
                            email
                        }
                    }
                    ... on UserError {
                        message
                    }
                }
            }
        `
        const result = await tester.graphql(login, {}, {}, {})
        expect(result.data.login.message).toBeTruthy();
        expect(result.data.login.message).toBe('invalid credentials');
    })

    test('updateUser', async () => {
        const updateUser = `
            mutation {
                updateUser(id: "${user._id.toString()}", firstName: "Bruce", lastName: "Wayne", location: "Perth", phone: "0987654321") {
                    ... on User {
                        id
                    }
                    ... on UserError {
                        message
                        firstName
                        lastName
                        location
                        phone
                    }
                }
            }
        `
        const result = await tester.graphql(updateUser, {}, {}, {});
        expect(result.data.updateUser).toBeTruthy();

        const { firstName, lastName, location, phone } = await User.findOne({ _id: user._id.toString() });
        expect(firstName).toBe('Bruce');
        expect(lastName).toBe('Wayne');
        expect(location).toBe('Perth');
        expect(phone).toBe('0987654321');
    })

    test('updateEmail', async () => {

    })

    test('updatePassword', async () => {

    })

    test('deleteUser', async () => {

    })

})