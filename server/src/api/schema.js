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
            return value.toISOString();
        },
        parseLiteral: (ast) => {
            if (ast.kind === Kind.INT) return new Date(+ast.value);
            return null;
        }
    })
}

const UserTypes = require('../user/user.types');
const CompanyTypes = require('../company/company.types');
const JobTypes = require('../job/job.types');
const ReviewTypes = require('../review/review.types');
const AppTypes = require('../app/app.types');
const UserResolvers = require('../user/user.resolvers');
const CompanyResolvers = require('../company/company.resolvers');
const JobResolvers = require('../job/job.resolvers');
const ReviewResolvers = require('../review/review.resolvers');
const AppResolvers = require('../app/app.resolvers');

exports.typeDefs = mergeTypeDefs([
    GeneralTypes, 
    UserTypes, 
    CompanyTypes, 
    JobTypes,
    ReviewTypes,
    AppTypes
]);
exports.resolvers = mergeResolvers([
    GeneralResolvers, 
    UserResolvers, 
    CompanyResolvers,
    JobResolvers,
    ReviewResolvers,
    AppResolvers
]);

exports.schema = makeExecutableSchema({
    typeDefs: this.typeDefs,
    resolvers: this.resolvers
})
