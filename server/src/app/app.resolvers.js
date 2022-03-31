const App = require('./app.model');

const AppResolvers = {
    AppResult: {
        __resolveType: (_) => {
            if (!_.__typename) return 'App';
            if (_.__typename === 'NotFound') return 'NotFound';
        }
    },
    Query: {
        app: async (_, { id }) => {
            const app = await App.findById(id);
            if (!app) return { __typename: 'NotFound', message: 'Application not found', id: id }
            return app.populate('applicant').populate('job');
        },
        apps: async(_, args) => {

        }
    },
    Mutation: {
        createApp: async (_, args, context) => {

        },
        updateApp: async (_, args, context) => {

        },
        deleteApp: async (_, { id }, context) => {

        }
    }
}

module.exports = AppResolvers