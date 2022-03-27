const { makeExecutableSchema } = require('@graphql-tools/schema');
const { mergeTypeDefs, mergeResolvers } = require('@graphql-tools/merge');

const GeneralTypes = `
    interface Error {
        message: String!
    }
`
const GeneralResolvers = {
    Error: {
        __resolveType: (_) => {
            if (_.message) return 'Error';
            return null;
        }
    }
}

const UserTypes = require('../../src/user/user.types');
const UserResolvers = require('../../src/user/user.resolvers');

exports.typeDefs = mergeTypeDefs([GeneralTypes, UserTypes]);
exports.resolvers = mergeResolvers([GeneralResolvers, UserResolvers]);

exports.schema = makeExecutableSchema({
    typeDefs: this.typeDefs,
    resolvers: this.resolvers
})
