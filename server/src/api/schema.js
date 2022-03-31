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
<<<<<<< HEAD
            return value.toISOString();
=======
            return value.getTime();
>>>>>>> 22f82ed2674af13861fae1b4381e7538334abb76
        },
        parseLiteral: (ast) => {
            if (ast.kind === Kind.INT) return new Date(+ast.value);
            return null;
        }
    })
}

<<<<<<< HEAD
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
=======
const UserTypes = require('../../src/user/user.types');
const CompanyTypes = require('../../src/company/company.types');
const JobTypes = require('../../src/job/job.types');
const UserResolvers = require('../../src/user/user.resolvers');
const CompanyResolvers = require('../../src/company/company.resolvers');
const JobResolvers = require('../../src/job/job.resolvers');
>>>>>>> 22f82ed2674af13861fae1b4381e7538334abb76

exports.typeDefs = mergeTypeDefs([
    GeneralTypes, 
    UserTypes, 
    CompanyTypes, 
<<<<<<< HEAD
    JobTypes,
    ReviewTypes,
    AppTypes
=======
    JobTypes
>>>>>>> 22f82ed2674af13861fae1b4381e7538334abb76
]);
exports.resolvers = mergeResolvers([
    GeneralResolvers, 
    UserResolvers, 
    CompanyResolvers,
<<<<<<< HEAD
    JobResolvers,
    ReviewResolvers,
    AppResolvers
=======
    JobResolvers
>>>>>>> 22f82ed2674af13861fae1b4381e7538334abb76
]);

exports.schema = makeExecutableSchema({
    typeDefs: this.typeDefs,
    resolvers: this.resolvers
})
