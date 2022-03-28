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

    union CompanyResult = Company | NotFound | CompanyExists

    type Query {
        company(id: ID!): Company!
        companies: [Company]!
    }

    type Mutation {
        createCompany(name: String!, headquarters: String!, overview: String, size: String): Company
    }
`
module.exports = CmopanyTypes;