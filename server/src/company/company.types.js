const CompanyTypes = `
    type Company {

    }

    type Query {
        company(id: ID!): Company!
        companies: [Company]!
    }

    type Mutation {
        createCompany(name: String!, headquarters: String!, overview: String, size: String): Company
    }
`
module.exports = CmopanyTypes;