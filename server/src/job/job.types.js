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
        industry: Industry!
        profession: Profession!
        workType: String!
        added: Date!
        closing: Date!
    }

    type Industry {
        id: ID!
        name: String!
        code: String!
        jobs: [Job]!
        jobCount: Int!
        professions: [Profession]!
    }

    type Profession {
        id: ID!
        name: String!
        industry: Industry!
        code: String!
        jobs: [Job]!
        jobCount: Int!
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
        allIndustries: [Industry]!
        industryJobs(ids: [ID]!): [Job]!
        allProfessions: [Profession]!
        professionJobs(ids: [ID]!): [Job]!
    }

    type Mutation {
        createJob(title: String!, headliner: String!, summary: String, description: String!, company: ID!, city: String!, suburb: String, industry: ID!, profession: ID!, workType: String!): JobResult
        updateJob(id: ID!, title: String, headliner: String, summary: String, description: String, city: String, suburb: String, industry: ID, profession: ID, workType: String): JobResult
        closeJob(id: ID!): JobResult
        deleteJob(id: ID!): JobResult
    }
`

module.exports = JobTypes;