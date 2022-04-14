const JobTypes = `
    type Job {
        id: ID!
        title: String!
        headliner: String!
        summary: String
        description: String!
        company: Company!
        city: String!
        suburb: String
        industry: String!
        profession: String!
        workType: String!
        added: Date!
        closing: Date!
        expired: Boolean!
    }

    type JobInputErrors {
        title: String
        headliner: String
        summary: String
        description: String
        company: String
        city: String
        suburb: String
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
        createJob(title: String!, headliner: String!, summary: String, description: String!, company: ID!, city: String!, suburb: String, industry: String!, profession: String!, workType: String!): JobResult
        updateJob(id: ID!, title: String, headliner: String, summary: String, description: String, city: String, suburb: String, industry: String, profession: String, workType: String): JobResult
        closeJob(id: ID!): JobResult
        deleteJob(id: ID!): JobResult
    }
`

module.exports = JobTypes;