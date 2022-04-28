const JobTypes = `
    type Job {
        id: ID!
        title: String!
        headliner: String!
        summary: String
        description: String!
        company: Company!
        location: Location!
        industry: Industry!
        profession: Profession!
        workType: String!
        payBase: Int!
        payCeiling: Int!
        added: Date!
        closing: Date!
    }

    type Location {
        id: ID!
        suburb: String!
        city: String!
        state: String!
        region: String!
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
        location: String
        industry: String
        profession: String
        workType: String
    }

    type InvalidJobInput implements Error {
        message: String!
        errors: JobInputErrors!
    }

    type JobsResult {
        jobs: [Job]!
        totalJobs: Int
    }

    union JobResult = Job | NotFound | InvalidJobInput

    type Query {
        getJob(id: ID!): JobResult!
        getJobs(sortByDate: Boolean, page: Int, limit: Int, title: String, company: ID, location: [ID], industry: [ID], profession: [ID], workType: [String], payBase: Int, payCeiling: Int, added: Date): JobsResult!
        allIndustries: [Industry]!
        allProfessions: [Profession]!
        allLocations: [Location]!
    }

    type Mutation {
        createJob(title: String!, headliner: String!, summary: String, description: String!, company: ID!, location: ID!, industry: ID!, profession: ID!, workType: String!): JobResult
        updateJob(id: ID!, title: String, headliner: String, summary: String, description: String, location: ID, industry: ID, profession: ID, workType: String): JobResult
        closeJob(id: ID!): JobResult
        deleteJob(id: ID!): JobResult
    }
`

module.exports = JobTypes;