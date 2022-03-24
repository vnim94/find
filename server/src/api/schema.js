const { makeExecutableSchema, mergeSchemas } = require('@graphql-tools/schema');
const typeDefs = require('../user/user.types');
const resolvers = require('../user/user.resolvers');

exports.userSchema = makeExecutableSchema({
    typeDefs,
    resolvers
})

exports.schema = mergeSchemas({
    schemas: [this.userSchema],
    typeDefs: {},
    resolvers: {},
})