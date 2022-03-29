const { makeExecutableSchema } = require('@graphql-tools/schema');
const { mergeTypeDefs, mergeResolvers } = require('@graphql-tools/merge');
const { Kind, GraphQLScalarType } = require('graphql');

const GeneralTypes = `
    interface Error {
        message: String!
    }

    type NotFound implements Error {
        message: String!
        id: ID!
    }

    scalar Date
`
const GeneralResolvers = {
    Error: {
        __resolveType: (_) => {
            if (_.__typeName === 'Error') return 'Error';
            return null;
        }
    },
    Date: new GraphQLScalarType({
        name: 'Date',
        parseValue: (value) => {
            return new Date(value);
        },
        serialize: (value) => {
            return value.getTime();
        },
        parseLiteral: (ast) => {
            if (ast.kind === Kind.INT) return new Date(+ast.value);
            return null;
        }
    })
}

const UserTypes = require('../../src/user/user.types');
const CompanyTypes = require('../../src/company/company.types');
const JobTypes = require('../../src/job/job.types');
const UserResolvers = require('../../src/user/user.resolvers');
const CompanyResolvers = require('../../src/company/company.resolvers');
const JobResolvers = require('../../src/job/job.resolvers');

exports.typeDefs = mergeTypeDefs([
    GeneralTypes, 
    UserTypes, 
    CompanyTypes, 
    JobTypes
]);
exports.resolvers = mergeResolvers([
    GeneralResolvers, 
    UserResolvers, 
    CompanyResolvers,
    JobResolvers
]);

exports.schema = makeExecutableSchema({
    typeDefs: this.typeDefs,
    resolvers: this.resolvers
})
