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
        token: String!
        user: User
    }

    type Query {
        user(id: ID!): User
        users: [User]
    }

    type Mutation {
        createUser(firstName: String!, lastName: String!, email: String!, location: String!, password: String!, phone: String): User
        login(email: String!, password: String!): AuthPayload
        updateUser(id: ID!, firstName: String!, lastName: String!, location: String!, phone: String): User
        updateEmail(id: ID!, email: String!): User
        updatePassword(id: ID!, password: String!): User
        deleteUser(id: ID!): User
    }

`
module.exports = UserTypes;