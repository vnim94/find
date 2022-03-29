const Job = require('./job.model');
const validator = require('../middleware/validator');

const JobResolvers = {
    JobResult: {
        __resolveType: (_) => {
            if (!_.__typename) return 'Job';
            if (_.__typename === 'NotFound') return 'NotFound';
            if (_.__typename === 'InvalidJobInput') return 'InvalidJobInput';
            return null;
        }
    },
    Query: {
        job: async (_, { id }) => {
            const job = await Job.findById(id).populate('company');
            if (!job) return { __typename: 'NotFound', message: 'Job not found', id: id }
            return job
        },
        jobs: async () => {
            return await Job.find({}).populate('company');
        }
    },
    Mutation: {
        createJob: async (_, args, context) => {
            if (!context.user) throw new Error('UNAUTHORISED');
            const errors = validator.job(args);
            if (Object.keys(errors).length > 0) return { __typename: 'InvalidJobInput', message: 'Invalid input', errors: errors }
            const job = await Job.create(args)
            return job.populate('company')
        },
        updateJob: async (_, args, context) => {

        },
        closeJob: async (_, args, context) => {

        },
        deleteJob: async (_, args, context) => {

        }
    }
}

module.exports = JobResolvers;
