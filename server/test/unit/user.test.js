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
            mutation updateEmail($id: ID!, $email: String!) {
                updateEmail(id: $id, email: $email) {
                    id
                    email
                }
            }
        `
        tester.test(true, updateEmail, {
            id: 'abc',
            email: 'updated@email.com'
        })
    })

    test('updatePassword', () => {
        const updatePassword = `
            mutation updatePassword($id: ID!, $password: String!) {
                updatePassword(id: $id, password: $password) {
                    id
                }
            }
        `
        tester.test(true, updatePassword, {
            id: 'abc',
            password: 'updated'
        })
    })

    test('deleteUser', () => {
        const deleteUser = `
            mutation deleteUser($id: ID!) {
                deleteUser(id: $id) {
                    id
                }
            }
        `
        tester.test(true, deleteUser, {
            id: 'abc'
        })
    })
})

describe.only('user resolvers', () => {

    const database = require('../../util/memoryDatabase');
    const User = require('../../src/user/user.model');
    const bcrypt = require('bcryptjs');
    let context;
    let user;

    beforeAll(async () => {
        await database.connect();
        await database.seed();
        user = await User.findOne();
        context = { user: { id: user._id.toString() } };
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
            mutation {
                createUser(firstName: "Bob", lastName: "Brown", email: "bbrown@email.com", location: "Melbourne", password: "password", phone: "0123456789") {
                    firstName
                    lastName
                    email
                    location
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
                    token
                    user {
                        email
                    }
                }
            }
        `
        const result = await tester.graphql(login, {}, {}, {})
        expect(result.errors).toBeTruthy();
        expect(result.errors[0].message).toBe('invalid credentials');
    })

    test('updateUser', async () => {
        const updateUser = `
            mutation {
                updateUser(id: "${user._id.toString()}", firstName: "James", lastName: "Bond", location: "London", phone: "09876544321") {
                    id
                    firstName
                    lastName
                    location
                    phone
                }
            }
        `
        const result = await tester.graphql(updateUser, {}, context, {});
        expect(result.data.updateUser.id).toBeTruthy();
        expect(result.data.updateUser.firstName).toBe('James')
        expect(result.data.updateUser.lastName).toBe('Bond');
        expect(result.data.updateUser.location).toBe('London');

        const updatedUser = await User.findById(user._id.toString());
        expect(updatedUser.firstName).toBe('James');
        expect(updatedUser.lastName).toBe('Bond');
        expect(updatedUser.location).toBe('London');
    })

    test('updateEmail', async () => {
        const updateEmail = `
            mutation {
                updateEmail(id: "${user._id.toString()}", email: "updated@email.com") {
                    id
                    email
                }
            }
        `
        const result = await tester.graphql(updateEmail, {}, context, {});
        expect(result.data.updateEmail.id).toBeTruthy();
        expect(result.data.updateEmail.email).toBe("updated@email.com");

        const updatedUser = await User.findById(user._id.toString());
        expect(updatedUser.email).toBe('updated@email.com');
    })

    test('updatePassword', async () => {
        const updatePassword = `
            mutation {
                updatePassword(id: "${user._id.toString()}", password: "updated") {
                    id
                }
            }
        `
        const result = await tester.graphql(updatePassword, {}, context, {});
        expect(result.data.updatePassword.id).toBeTruthy();

        const updatedUser = await User.findById(user._id.toString());
        expect(bcrypt.compareSync('updated', updatedUser.password)).toBeTruthy();
    })

    test('deleteUser', async () => {
        const deleteUser = `
            mutation {
                deleteUser(id: "${user._id.toString()}") {
                    id
                }
            }
        `
        const result = await tester.graphql(deleteUser, {}, context, {});
        expect(result.data.deleteUser.id).toBeTruthy();
        const deletedUser = await User.findById(user._id.toString());
        expect(deletedUser).toBeFalsy();
    })

})