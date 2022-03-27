const User = require('./user.model');
const { authenticateUser } = require('../middleware/auth');
const validate = require('../middleware/validator');

const UserResolvers = {
    Query: {
        user: async (_, { id }) => {
            const user = await User.findById(id);
            if (!user) throw new Error('NOT_FOUND');
            return user;
        },
        users: async () => {
            return await User.find({});
        }
    },
    Mutation: {
        createUser: async (_, args) => {
            const errors = [
                ...validate.user(args),
                ...validate.email(args.email),
                ...validate.password(args.password)
            ]
            if (errors.length > 0) throw new Error(errors); 

            return await User.create(args);
        },
        login: async (_, args) => {
            const authPayload = await authenticateUser(args.email, args.password);
            if (authPayload) return authPayload
            throw new Error('UNAUTHORIZED'); 
        },
        updateUser: async (_, args, context) => {
            if (!context.user || context.user.id !== args.id) throw new Error('UNAUTHORIZED');
            const errors = validate.user(args);
            if (errors.length > 0) throw new Error(errors);

            const { id, firstName, lastName, location, phone } = args;
            return await User.findByIdAndUpdate(id, { 
                firstName: firstName,
                lastName: lastName,
                location: location,
                phone: phone
            }, { new: true })
        }, 
        updateEmail: async (_, args, context) => {
            if (!context.user || context.user.id !== args.id) throw new Error('UNAUTHORIZED');
            const error = validate.email(args.email);
            if (error.length > 0) throw new Error(error);
            return await User.findByIdAndUpdate(args.id, { email: args.email }, { new: true })
        },
        updatePassword: async (_, args, context) => {
            if (!context.user || context.user.id !== args.id) throw new Error('UNAUTHORIZED');
            const error = validate.password(args.password);
            if (error.length > 0) throw new Error(error);

            let user = await User.findById(args.id);
            user.password = args.password;
            return await user.save();
        },
        deleteUser: async (_, args, context) => {
            if (!context.user || context.user.id !== args.id) throw new Error('UNAUTHORIZED');
            return await User.findByIdAndDelete(args.id);
        }
    }
}

module.exports = UserResolvers;