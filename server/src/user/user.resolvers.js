const User = require('./user.model');
const { authenticateUser } = require('../middleware/auth');

const UserResolvers = {
    Query: {
        user: async (_, { id }) => {
            return await User.findById(id);
        },
        users: async () => {
            return await User.find({});
        }
    },
    Mutation: {
        createUser: async (_, args) => {
            let user;
            try {
                user = await User.create(args);
            } catch (err) {
                throw new Error(err.message);
            }
            return user;
        },
        login: async (_, args) => {
            const authPayload = await authenticateUser(args.email, args.password);
            if (authPayload) return authPayload
            throw new Error('invalid credentials'); 
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

module.exports = UserResolvers;