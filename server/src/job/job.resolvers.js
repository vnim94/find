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
            if (!context.user) throw new Error('UNAUTHORISED');
            const errors = validator.job(args);
            if (Object.keys(errors).length > 0) return { __typename: 'InvalidJobInput', message: 'Invalid input', errors: errors }

            const { id, title, description, city, industry, profession, workType } = args;
            return await Job.findByIdAndUpdate(id, {
                title: title,
                description: description,
                city: city,
                industry: industry,
                profession: profession,
                workType: workType
            }, { new: true })
        },
        closeJob: async (_, { id }, context) => {
            if (!context.user) throw new Error('UNAUTHORISED');
            const closedJob = await Job.findByIdAndUpdate(id, { expired: true }, { new: true });
            if (!closedJob) return { __typename: 'NotFound', message: 'Job not found', id: id }
            return closedJob
        },
        deleteJob: async (_, { id }, context) => {
            if (!context.user) throw new Error('UNAUTHORISED');
            const deletedJob = await Job.findByIdAndDelete(id);
            if (!deletedJob) return { __typename: 'NotFound', message: 'Job not found', id: id }
            return deletedJob
        }
    }
}

module.exports = JobResolvers;
