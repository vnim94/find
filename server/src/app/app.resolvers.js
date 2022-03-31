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
            const app = await App.findById(id)
                .populate('applicant')
                .populate({ 
                    path: 'job', 
                    populate: { path: 'company' }
                });
            if (!app) return { __typename: 'NotFound', message: 'Application not found', id: id }
            return app;
        },
        apps: async(_, args) => {
            return await App.find({})
                .populate('applicant')
                .populate({ 
                    path: 'job', 
                    populate: { path: 'company' }
                });
        }
    },
    Mutation: {
        createApp: async (_, args, context) => {
            if (!context.user) throw new Error('UNAUTHORISED');

            const newApp = await App.create(args)
            return App.findById(newApp._id)
                .populate('applicant')
                .populate({
                    path: 'job',
                    populate: { path: 'company' }
                });
        },
        updateApp: async (_, args, context) => {
            if (!context.user) throw new Error('UNAUTHORISED');

            const { id, resume, letter } = args;
            return await App.findByIdAndUpdate(id, { resume: resume, letter: letter}, { new: true })
                .populate('applicant')
                .populate({ path: 'job', populate: { path: 'company' } })
        },
        deleteApp: async (_, { id }, context) => {

        }
    }
}

module.exports = AppResolvers