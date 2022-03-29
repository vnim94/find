const Job = require('./job.model');

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
