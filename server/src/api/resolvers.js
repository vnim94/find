const User = require('../user/user.model');

const resolvers = {
    Query: {
        getUser: async (_, { id }) => {
            return await User.findById(id);
        },
        getUsers: async () => {
            return await User.find({});
        }
    },
    Mutation: {
        createUser: async () => {

        },
        login: async () => {

        },
        updateUser: async (_, args, context) => {
            
        }, 
        updateEmail: async (_, args, context) => {

        },
        updatePassword: async (_, args, context) => {

        },
        deleteUser: async (_, args, context) => {
            
        }
    }
}

module.exports = resolvers;