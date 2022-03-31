const AppTypes = `
    type App {
        id: ID!
        applicant: User!
        job: Job!
        resume: String!
        letter: String!
        status: String!
    }

    union AppResult = App | NotFound

    type Query {
        app(id: ID!): AppResult
        apps(user: ID): [App]
    }

    type Mutation {
        createApp(applicant: ID!, job: ID!, resume: String, letter: String, status: String): App
        updateApp(id: ID!, resume: String, letter: String, status: String): AppResult
        deleteApp(id: ID!): AppResult
    }
`

module.exports = AppTypes;