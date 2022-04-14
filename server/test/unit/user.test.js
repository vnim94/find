const { typeDefs, resolvers } = require('../../src/api/schema');
const EasyGraphQLTester = require('easygraphql-tester');
const tester = new EasyGraphQLTester(typeDefs, resolvers);

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

    test('user using id', () => {
        const query = `
            {
                user(id: "user_id") {
                    ... on User {
                        firstName
                        lastName
                        email
                    }
                }
            }
        `

        tester.test(true, query);
    })  

    test('user using email', () => {
        const query = `
            {
                user(email: "email@email.com") {
                    ... on User {
                        firstName
                        lastName
                    }
                }
            }
        `
        tester.test(true, query);
    })

    test('user using token', () => {
        const query = `
            {
                user(token: "abcd") {
                    ... on User {
                        firstName
                        lastName
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
                }
            }
        `

        tester.test(false, query);
    })

})

describe('user mutations', () => {

    test('register', () => {
        const register = `
            mutation {
                register(email: "jsmith@email.com", password: "password") {
                    ... on User {
                        email
                    }
                }
            }
        `

        tester.test(true, register)
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
                }
            }
        `
        tester.test(true, updateEmail)
    })

    test('updatePassword', () => {
        const updatePassword = `
            mutation  {
                updatePassword(id: "abc", password: "password") {
                    ... on User {
                        id
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
                }
            }
        `
        tester.test(true, deleteUser)
    })
})

describe('user resolvers', () => {

    const database = require('../../util/memoryDatabase');
    const User = require('../../src/user/user.model');
    const bcrypt = require('bcryptjs');
    const { createToken } = require('../../src/middleware/auth');
    let context;
    let user;
    let token; 

    beforeAll(async () => {
        await database.connect();
        await database.seed();
        user = await User.findOne();
        context = { user: user._id.toString() };
        token = createToken(user.id.toString());
    });

    afterAll(async () => { await database.disconnect() });

    test('user using id', async () => {
        const query = `
            {
                user(id: "${user._id.toString()}") {
                    ... on User {
                        firstName
                        lastName
                        fullName
                        email
                    }
                    ... on NotFound {
                        message
                        id
                    }
                }
            }
        `
        const result = await tester.graphql(query, {}, {}, {});
        expect(result.data.user).toBeTruthy();

        const { firstName, lastName, fullName, email } = result.data.user
        expect(firstName).toBe('John');
        expect(lastName).toBe('Smith');
        expect(fullName).toBe('John Smith');
        expect(email).toBe('jsmith@email.com');
    })

    test('user using email', async () => {
        const query = `
            {
                user(email: "${user.email}") {
                    ... on User {
                        firstName
                        lastName
                        fullName
                        email
                    }
                    ... on NotFound {
                        message
                        id
                    }
                }
            }
        `
        const result = await tester.graphql(query, {}, {}, {});
        expect(result.data.user).toBeTruthy();

        const { firstName, lastName, fullName } = result.data.user
        expect(firstName).toBe('John');
        expect(lastName).toBe('Smith');
        expect(fullName).toBe('John Smith');
    })

    test('user using token', async () => {
        const query = `
            {
                user(token: "${token}") {
                    ... on User {
                        id
                        firstName
                        lastName
                        fullName
                        email
                    }
                    ... on NotFound {
                        message
                        id
                    }
                }
            }
        `
        const result = await tester.graphql(query, {}, {}, {});
        expect(result.data.user).toBeTruthy();

        const { firstName, lastName, fullName } = result.data.user
        expect(firstName).toBe('John');
        expect(lastName).toBe('Smith');
        expect(fullName).toBe('John Smith');
    })

    test('user not found', async () => {
        const query = `
            {
                user(email: "abc@email.com") {
                    ... on User {
                        firstName
                        lastName
                        email
                    }
                    ... on NotFound {
                        message
                        id
                    }
                }
            }
        `
        const result = await tester.graphql(query, {}, {}, {});
        expect(result.data.user.message).toBe('User not found');
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

    test('register', async () => {
        const register = `
            mutation {
                register(email: "bbrown@email.com", password: "password") {
                    ... on AuthPayload {
                        token
                        user {
                            firstName
                            lastName
                            email
                            location
                        }
                    }
                }
            }
        `
        const result = await tester.graphql(register, {}, {}, {})
        expect(result.data.register.token).toBeTruthy();
        expect(result.data.register.user.email).toBe('bbrown@email.com');

        const newUser = await User.findOne({ email: "bbrown@email.com" });
        expect(newUser).toBeTruthy();
    })

    test('register with invalid input', async () => {
        const register = `
            mutation {
                register(email: "bbrownemail.com", password: "") {
                    ... on InvalidUserInput {
                        message
                        errors {
                            email
                            password
                        }
                    }
                }
            }
        `
        const result = await tester.graphql(register, {}, {}, {})     
        expect(result.data.register.message).toBe('Invalid input');
        expect(result.data.register.errors).toBeTruthy();
    })

    test('register with existing email', async () => {
        const register = `
            mutation {
                register(email: "jsmith@email.com", password: "password") {
                    ... on UserExists {
                        message
                        email
                    }
                }
            }
        `
        const result = await tester.graphql(register, {}, {}, {}) 
        expect(result.data.register.message).toBe('User already exists');
        expect(result.data.register.email).toBe('jsmith@email.com')
    })

    test('login', async () => {
        const login = `
            mutation {
                login(email: "jsmith@email.com", password: "password") {
                    ... on AuthPayload { 
                        token
                        user {
                            email
                        }
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
                    ... on InvalidCredentials {
                        message
                    }
                }
            }
        `
        const result = await tester.graphql(login, {}, {}, {})
        expect(result.data.login.message).toBeTruthy();
        expect(result.data.login.message).toBe('Invalid credentials');
    })

    test('updateUser', async () => {
        const updateUser = `
            mutation {
                updateUser(id: "${user._id.toString()}", firstName: "James", lastName: "Bond", location: "London", phone: "+61467662228") {
                    ... on User { 
                        id
                        firstName
                        lastName
                        location
                        phone
                    }
                }
            }
        `
        const result = await tester.graphql(updateUser, {}, context, {});
        expect(result.data.updateUser.id).toBeTruthy();
        expect(result.data.updateUser.firstName).toBe('James')
        expect(result.data.updateUser.lastName).toBe('Bond');
        expect(result.data.updateUser.location).toBe('London');
        expect(result.data.updateUser.phone).toBe('+61467662228')

        const updatedUser = await User.findById(user._id.toString());
        expect(updatedUser.firstName).toBe('James');
        expect(updatedUser.lastName).toBe('Bond');
        expect(updatedUser.location).toBe('London');
        expect(updatedUser.phone).toBe('+61467662228')
    })

    test('updateUser with invalid phone', async () => {
        const updateUser = `
            mutation {
                updateUser(id: "${user._id.toString()}", firstName: "J", lastName: "B", location: "", phone: "") {
                    ... on InvalidUserInput {
                        message
                        errors {
                            firstName
                            lastName
                            location
                        }
                    }
                }
            }
        `
        const result = await tester.graphql(updateUser, {}, context, {});
        expect(result.data.updateUser.message).toBe('Invalid input');
        expect(result.data.updateUser.errors).toBeTruthy();
    })

    test('updateEmail', async () => {
        const updateEmail = `
            mutation {
                updateEmail(id: "${user._id.toString()}", email: "updated@email.com") {
                    ... on User { 
                        id
                        email
                    }
                }
            }
        `
        const result = await tester.graphql(updateEmail, {}, context, {});
        expect(result.data.updateEmail.id).toBeTruthy();
        expect(result.data.updateEmail.email).toBe("updated@email.com");

        const updatedUser = await User.findById(user._id.toString());
        expect(updatedUser.email).toBe('updated@email.com');
    })

    test('updateEmail with invalid input', async () => {
        const updateEmail = `
            mutation {
                updateEmail(id: "${user._id.toString()}", email: "email.com") {
                    ... on InvalidUserInput {
                        message
                        errors {
                            email
                        }
                    }
                }
            }
        `
        const result = await tester.graphql(updateEmail, {}, context, {});
        expect(result.data.updateEmail.message).toBeTruthy();
        expect(result.data.updateEmail.errors.email).toBeTruthy();
    })

    test('updateEmail with existing email', async () => {
        const updateEmail = `
            mutation {
                updateEmail(id: "${user._id.toString()}", email: "updated@email.com") {
                    ... on UserExists { 
                        message
                        email
                    }
                }
            }
        `
        const result = await tester.graphql(updateEmail, {}, context, {});
        expect(result.data.updateEmail.message).toBeTruthy();
        expect(result.data.updateEmail.email).toBe("updated@email.com");
    })

    test('updatePassword', async () => {
        const updatePassword = `
            mutation {
                updatePassword(id: "${user._id.toString()}", password: "updated") {
                    ... on User {
                        id
                    }
                }
            }
        `
        const result = await tester.graphql(updatePassword, {}, context, {});
        expect(result.data.updatePassword.id).toBeTruthy();

        const updatedUser = await User.findById(user._id.toString());
        expect(bcrypt.compareSync('updated', updatedUser.password)).toBeTruthy();
    })

    test('updatePassword with invalid input', async () => {
        const updatePassword = `
            mutation {
                updatePassword(id: "${user._id.toString()}", password: "a") {
                    ... on InvalidUserInput {
                        message
                        errors {
                            password
                        }
                    }
                }
            }
        `
        const result = await tester.graphql(updatePassword, {}, context, {});
        expect(result.data.updatePassword.errors).toBeTruthy();
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