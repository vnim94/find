const { makeExecutableSchema } = require('@graphql-tools/schema');
const { mergeTypeDefs, mergeResolvers } = require('@graphql-tools/merge');

const GenericTypes = `
    interface Error {
        message: String!
    }
`
const GenericResolvers = {
    Error: {
        __resolveType: (_) => {
            return 'Error';
        } 
    }
}

const UserTypes = require('../../src/user/user.types');
const UserResolvers = require('../../src/user/user.resolvers');

exports.typeDefs = mergeTypeDefs([GenericTypes, UserTypes]);
exports.resolvers = mergeResolvers([GenericResolvers, UserResolvers]);

exports.schema = makeExecutableSchema({
    typeDefs: this.typeDefs,
    resolvers: this.resolvers
})
