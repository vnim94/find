const app = require('../../app');
const request = require('supertest')(app);

const database = require('../../util/memoryDatabase');
const User = require('../../src/user/user.model');
const { createToken } = require('../../src/middleware/auth');
let user;
let token;

beforeAll(async () => {
    await database.connect();
    await database.seed();
    user = await User.findOne();
    token = createToken(user._id.toString());
});

afterAll(async () => { await database.disconnect() });

describe('user queries', () => {

    test('returns user details if valid id', async () => {

        const query = `
            {
                user(id: "${user._id.toString()}") {
                    ... on User {
                        id
                        firstName
                        lastName
                    }
                }
            }
        `
        const response = await request.post('/api')
            .send({
                query: query
            })

        expect(response.body.data.user).toBeTruthy();

    });

    test('return user not found if invalid id', async () => {
        const query = `
            {
                user(id: "623fb7ceeb0db10460a55d43") {
                    ... on UserNotFound {
                        message
                        id
                    }
                }
            }
        `
        const response = await request.post('/api')
            .send({
                query: query
            })
        
        expect(response.body.data.user.id).toBeTruthy();
        expect(response.body.data.user.message).toBe('User not found');
    })

    test('returns all users', async () => {
        const query = `
            {
                users {
                    id
                    firstName
                    lastName
                    email
                }
            }
        `
        const response = await request.post('/api')
            .send({
                query: query
            })

        expect(response.body.data.users).toBeTruthy();
        expect(response.body.data.users.length).toBe(1);
        
        const { firstName, lastName, email } = response.body.data.users[0];
        expect(firstName).toBe('John');
        expect(lastName).toBe('Smith');
        expect(email).toBe('jsmith@email.com');
    })

});

describe('user mutations', () => {

    test('createUser adds new user to database and returns new user', async () => {
        const createUser = `
            mutation {
                createUser(firstName: "Bob", lastName: "Brown", email: "bbrown@email.com", location: "Melbourne", password: "password", phone: "") {
                    ... on User {
                        id
                        firstName
                        lastName
                        email
                        location
                    }
                }
            }
        `
        const response = await request.post('/api')
            .send({
                query: createUser
            })
        
        expect(response.body.data.createUser).toBeTruthy();
        const { id, firstName, lastName, email, location } = response.body.data.createUser;
        expect(firstName).toBe('Bob');
        expect(lastName).toBe('Brown');
        expect(email).toBe('bbrown@email.com');
        expect(location).toBe('Melbourne');
        
        const newUser = await User.findById(id);
        expect(newUser).toBeTruthy();
        expect(newUser.firstName).toBe('Bob');
        expect(newUser.lastName).toBe('Brown');
        expect(newUser.email).toBe('bbrown@email.com');
        expect(location).toBe('Melbourne');
    })

    test('createUser with invalid input return error', async () => {
        const createUser = `
            mutation {
                createUser(firstName: "a", lastName: "b", email: "abcde", location: "", password: "123", phone: "") {
                    ... on InvalidInput {
                        message
                        errors {
                            firstName
                            lastName
                            email
                            password
                            phone
                        }
                    }
                }
            }
        `
        const response = await request.post('/api')
            .send({
                query: createUser
            })

        expect(response.body.data.createUser.errors).toBeTruthy();
        expect(response.body.data.createUser.message).toBe('Invalid input')
    })

    test('login', async () => {

    })

    test('login with invalid credentials', async () => {

    })

    test('updateUser', async () => {

    })

    test('updateUser with invalid input', async () => {
        
    })

    test('updateEmail', async () => {

    })

})
