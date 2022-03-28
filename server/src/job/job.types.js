const JobTypes = `
    type Job {
        title: String!
        description: String!
        company: ID!
        city: String!
        industry: String!
        profession: String!
        workType: String!
        added: Date!
        closing: Date!
        expired: Boolean!
    }

    type JobInputErrors {
        title: String
        description: String
        company: ID
        city: String
        industry: String
        profession: String
        workType: String
    }

    type InvalidJobInput implements Error {
        message: String!
        errors: JobInputErrors!
    }

    union JobResult = Job | NotFound | InvalidJobInput

    type Query {
        job(id: ID!): JobResult!
        jobs: [Job]!
    }

    type Mutation {
        createJob(title: String!, description: String!, company: ID!, city: String!, industry: String!, profession: String!, workType: String!): JobResult
        updateJob(id: ID!, title: String, description: String, city: String, industry: String, profession: String, workType: String): JobResult
        closeJob(id: ID!): JobResult
        deleteJob(id: ID!): JobResult
    }
`

module.exports = JobTypes;