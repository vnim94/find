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
            return await User.create(args);
        },
        login: async (_, args) => {
            const authPayload = await authenticateUser(args.email, args.password);
            if (authPayload) return authPayload
            throw new Error('invalid credentials'); 
        },
        updateUser: async (_, args, context) => {
            if (!context.user || context.user.id !== args.id) throw new Error('unauthorised');
            const { id, firstName, lastName, location, phone } = args;
            return await User.findByIdAndUpdate(id, { 
                firstName: firstName,
                lastName: lastName,
                location: location,
                phone: phone
            }, { new: true })
        }, 
        updateEmail: async (_, args, context) => {
            if (!context.user || context.user.id !== args.id) throw new Error('unauthorised');
            return await User.findByIdAndUpdate(args.id, { email: args.email }, { new: true })
        },
        updatePassword: async (_, args, context) => {
            if (!context.user || context.user.id !== args.id) throw new Error('unauthorised');
            let user = await User.findById(args.id);
            user.password = args.password;
            return await user.save();
        },
        deleteUser: async (_, args, context) => {
            if (!context.user || context.user.id !== args.id) throw new Error('unauthorised');
            return await User.findByIdAndDelete(args.id);
        }
    }
}

module.exports = UserResolvers;