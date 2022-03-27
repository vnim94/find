const UserTypes = `
    type User {
        id: ID!
        firstName: String!
        lastName: String!
        email: String!
        location: String!
        password: String!
        phone: String
    }

    type UserNotFound implements Error {
        message: String!
    }

    type UserExists implements Error {
        message: String!
    }

    type InputErrors {
        firstName: String
        lastName: String
        email: String
        location: String
        password: String
        phone: String
    }

    type InvalidInput implements Error {
        message: String!
        errors: InputErrors!
    }

    type AuthPayload {
        token: String!
        user: User!
    }

    type InvalidCredentials implements Error {
        message: String!
    }

    union UserResult = User | UserNotFound | UserExists | InvalidInput
    union LoginResult = AuthPayload | InvalidCredentials

    type Query {
        user(id: ID!): User!
        users: [User]!
    }

    type Mutation {
        createUser(firstName: String!, lastName: String!, email: String!, location: String!, password: String!, phone: String): UserResult
        login(email: String!, password: String!): LoginResult
        updateUser(id: ID!, firstName: String!, lastName: String!, location: String!, phone: String): UserResult
        updateEmail(id: ID!, email: String!): UserResult
        updatePassword(id: ID!, password: String!): UserResult
        deleteUser(id: ID!): UserResult
    }
`
module.exports = UserTypes;