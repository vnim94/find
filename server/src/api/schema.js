const { makeExecutableSchema } = require('@graphql-tools/schema');
const { mergeTypeDefs, mergeResolvers } = require('@graphql-tools/merge');

const GeneralTypes = `
    interface Error {
        message: String!
    }

    type NotFound implements Error {
        message: String!
        id: ID!
    }
`
const GeneralResolvers = {
    Error: {
        __resolveType: (_) => {
            if (_.__typeName === 'Error') return 'Error';
            return null;
        }
    }
}

const UserTypes = require('../../src/user/user.types');
const CompanyTypes = require('../../src/company/company.types');
const UserResolvers = require('../../src/user/user.resolvers');
const CompanyResolvers = require('../../src/company/company.resolvers');

exports.typeDefs = mergeTypeDefs([GeneralTypes, UserTypes, CompanyTypes]);
exports.resolvers = mergeResolvers([GeneralResolvers, UserResolvers, CompanyResolvers]);

exports.schema = makeExecutableSchema({
    typeDefs: this.typeDefs,
    resolvers: this.resolvers
})
