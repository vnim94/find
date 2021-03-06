const CompanyTypes = `
    type Company {
        id: ID!
        name: String!
        website: String
        industry: Industry!
        specialities: [String]
        headquarters: String
        overview: String
        mission: String
        culture: Culture
        reviews: Review
        size: String
        logo: String
    }

    type Culture {
        image: String
        keyMessage: Content
        values: [Content]
        perks: [Content]
        diversity: String
    }

    type Content {
        heading: String
        text: String
    }

    type Review {
        averageRating: Float
        totalCount: Int
    }

    type CompanyExists implements Error {
        message: String!
        name: String!
    }

    type CompanyInputErrors {
        name: String
        industry: String
    }

    type InvalidCompanyInput implements Error {
        message: String!
        errors: CompanyInputErrors!
    }

    union CompanyResult = Company | NotFound | CompanyExists | InvalidCompanyInput

    type Query {
        company(id: ID!): CompanyResult!
        companies: [Company]!
    }

    type Mutation {
        createCompany(name: String!, website: String, industry: ID!, specialities: [String], headquarters: String, overview: String, size: String, logo: String): CompanyResult
        updateCompany(id: ID!, name: String, website: String, industry: ID, specialities: [String], headquarters: String, overview: String, size: String, logo: String): CompanyResult
        deleteCompany(id: ID!): CompanyResult
    }
`
module.exports = CompanyTypes;