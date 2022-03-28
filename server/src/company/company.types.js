const CompanyTypes = `
    type Company {
        id: ID!
        name: String!
        headquarters: String!
        overview: String
        averageRating: Float
        size: String
    }

    type CompanyExists implements Error {
        message: String!
        name: String!
    }

    type CompanyInputErrors {
        name: String
        headquarters: String
    }

    type InvalidCompanyInput implements Error {
        message: String!
        errors: CompanyInput
    }

    union CompanyResult = Company | NotFound | CompanyExists

    type Query {
        company(id: ID!): CompanyResult!
        companies: [Company]!
    }

    type Mutation {
        createCompany(name: String!, headquarters: String!, overview: String, size: String): CompanyResult
        updateCompany(id: ID!, name: String, headquarters: String, overview: String, size: String): CompanyResult
        deleteCompany(id: ID!): CompanyResult
    }
`
module.exports = CompanyTypes;