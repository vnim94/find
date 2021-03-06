const User = require('./user.model');
const { authenticateUser, createToken, decodeToken } = require('../middleware/auth');
const validate = require('../middleware/validator');

const UserResolvers = {
    UserResult: {
        __resolveType: (_) => {
            if (!_.__typename) return 'User';
            if (_.__typename === 'InvalidUserInput') return 'InvalidUserInput';
            if (_.__typename === 'NotFound') return 'NotFound';
            if (_.__typename === 'UserExists') return 'UserExists';
            if (_.__typename === 'AuthPayload') return 'AuthPayload';
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
        user: async (_, { id, email, token } ) => {
            let user;
            if (id) { 
                user = await User.findById(id);
                if (!user) return { __typename: 'NotFound', message: 'User not found', id: id }
            } else if (email) { 
                user = await User.findOne({ email: email });
                if (!user) return { __typename: 'NotFound', message: 'User not found', id: email }
            } else if (token) {
                user = await User.findById(decodeToken(token));
                if (!user) return { __typename: 'NotFound', message: 'User not found', id: id }
            }
            return user;
        },
        users: async () => {
            return await User.find({});
        }
    },
    Mutation: {
        register: async (_, args) => {
            const errors = {
                ...validate.email(args.email),
                ...validate.password(args.password)
            }
            if (Object.keys(errors).length > 0) return { __typename: 'InvalidUserInput', message: 'Invalid input', errors: errors }; 
            
            if (await User.findOne({ email: args.email })) return { __typename: 'UserExists', message: 'User already exists', email: args.email };
            
            const newUser = await User.create(args);
            return { __typename: 'AuthPayload', token: createToken(newUser._id.toString()), user: newUser }
        },
        login: async (_, args) => {
            const authPayload = await authenticateUser(args.email, args.password);
            if (authPayload) return { __typename: 'AuthPayload', token: authPayload.token, user: authPayload.user }
            return { __typename: 'InvalidCredentials', message: 'Invalid credentials' } 
        },
        updateUser: async (_, args, context) => {
            if (!context.user || context.user !== args.id) throw new Error('UNAUTHORIZED');

            const errors = {
                ...validate.name(args.firstName, args.lastName),
                ...validate.phone(args.phone)
            }
            if (Object.keys(errors).length > 0) return { __typename: 'InvalidUserInput', message: 'Invalid input', errors: errors };
            
            const { id, firstName, lastName, location, phone } = args;
            return await User.findByIdAndUpdate(id, { 
                firstName: firstName,
                lastName: lastName,
                location: location,
                phone: phone
            }, { new: true })
        }, 
        updateEmail: async (_, args, context) => {
            if (!context.user || context.user !== args.id) throw new Error('UNAUTHORIZED');

            const error = validate.email(args.email);
            if (error) return { __typename: 'InvalidUserInput', message: 'Invalid input', errors: error };
            
            if (await User.findOne({ email: args.email })) return { __typename: 'UserExists', message: 'User already exists', email: args.email };
            
            return await User.findByIdAndUpdate(args.id, { email: args.email }, { new: true })
        },
        updatePassword: async (_, args, context) => {
            if (!context.user || context.user !== args.id) throw new Error('UNAUTHORIZED');

            const error = validate.password(args.password);
            if (error) return { __typename: 'InvalidUserInput', message: 'Invalid input', errors: error };

            let user = await User.findById(args.id);
            user.password = args.password;
            return await user.save();
        },
        deleteUser: async (_, args, context) => {
            if (!context.user || context.user !== args.id) throw new Error('UNAUTHORIZED');
            return await User.findByIdAndDelete(args.id);
        }
    }
}

module.exports = UserResolvers;