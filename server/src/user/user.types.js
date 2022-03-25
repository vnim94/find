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

    type AuthPayload {
        token: String
        user: User
    }

    type UserError implements Error {
        message: String!
        firstName: String!
        lastName: String!
        email: String!
        location: String!
        password: String!
        phone: String
    }

    union UserResult = User | AuthPayload | UserError

    type Query {
        user(id: ID!): UserResult!
        users: [UserResult]!
    }

    type Mutation {
        createUser(firstName: String!, lastName: String!, email: String!, location: String!, password: String!, phone: String): UserResult
        login(email: String!, password: String!): UserResult
        updateUser(id: ID!, firstName: String!, lastName: String!, location: String!, phone: String): UserResult
        updateEmail(id: ID!, email: String!): UserResult
        updatePassword(id: ID!, password: String!): UserResult
        deleteUser(id: ID!): UserResult
    }
`
module.exports = UserTypes;