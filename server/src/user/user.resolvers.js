const User = require('./user.model');
const { authenticateUser } = require('../middleware/auth');

const UserResolvers = {
    UserResult: {
        __resolveType: (_) => {
            if (_.id) return 'User';
            if (_.token) return 'AuthPayload';
            if (_.message) return 'UserError'
            return null;
        }
    },
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
                return { message: 'error creating user' }
            }
            return user;
        },
        login: async (_, args) => {
            const authPayload = await authenticateUser(args.email, args.password);
            if (!authPayload) return { message: 'invalid credentials' }
            return authPayload
        },
        updateUser: async (_, args, context) => {
            const { id, firstName, lastName, location, phone } = args;
            let user;
            try {
                user = await User.findByIdAndUpdate(id, {
                    firstName: firstName,
                    lastName: lastName,
                    location: location,
                    phone: phone
                })
            } catch (err) {
                return { 
                    message: 'error updating user details',
                    firstName: '',
                    lastName: '',
                    location: '',
                    phone: '' 
                }
            }
            return user;
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