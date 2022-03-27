const User = require('./user.model');
const { authenticateUser } = require('../middleware/auth');
const validate = require('../middleware/validator');

const UserResolvers = {
    UserResult: {
        __resolveType: (_) => {
            if (_.id) return 'User';
            if (_.errors) return 'InvalidInput';
            if (_.message) return 'Error';
            return null;
        }
    },
    LoginResult: {
        __resolveType: (_) => {
            if (_.token) return 'AuthPayload';
            if (_.message) return 'InvalidCredentials';
            return null;
        }
    },
    Query: {
        user: async (_, { id }) => {
            const user = await User.findById(id);
            if (!user) return { __typename: 'UserNotFound', message: 'User not found' }
            return user;
        },
        users: async () => {
            return await User.find({});
        }
    },
    Mutation: {
        createUser: async (_, args) => {
            const errors = {
                ...validate.user(args),
                ...validate.email(args.email),
                ...validate.password(args.password)
            }
            if (errors.length > 0) return { __typename: 'InvalidInput', message: 'Invalid input', errors: errors }; 

            if (await User.findOne({ email: args.email })) return { __typename: 'UserExists', message: 'User already exists' };

            return await User.create(args);
        },
        login: async (_, args) => {
            const authPayload = await authenticateUser(args.email, args.password);
            if (authPayload) return { __typename: 'AuthPayload', token: authPayload.token, user: authPayload.user }
            return { __typename: 'InvalidCredentials', message: 'Invalid credentials' } 
        },
        updateUser: async (_, args, context) => {
            if (!context.user || context.user.id !== args.id) throw new Error('UNAUTHORIZED');

            const errors = validate.user(args);
            if (errors.length > 0) return { __typename: 'InvalidInput', message: 'Invalid input', errors: errors };

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
            if (error.length > 0) return { __typename: 'InvalidInput', message: 'Invalid input', errors: error };
            
            return await User.findByIdAndUpdate(args.id, { email: args.email }, { new: true })
        },
        updatePassword: async (_, args, context) => {
            if (!context.user || context.user.id !== args.id) throw new Error('UNAUTHORIZED');

            const error = validate.password(args.password);
            if (error.length > 0) return { __typename: 'InvalidInput', message: 'Invalid input', errors: errors };

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