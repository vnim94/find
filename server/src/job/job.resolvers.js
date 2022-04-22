const Job = require('./job.model');
const Location = require('./location.model');
const Industry = require('./industry.model');
const Profession = require('./profession.model');
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
        jobs: async (_, query) => {
            if (query.city) query.city = { $regex: query.city }
            if (query.suburb) query.suburb = { $regex: query.suburb }
            if (query.industry) query.industry = { $in: query.industry }
            if (query.profession) query.profession = { $in: query.profession }
            if (query.workType) query.workType = { $in: query.workType }
            if (query.payBase) query.payBase = { $gte: query.payBase }
            if (query.payCeiling) query.payCeiling = { $lte: query.payCeiling }
            if (query.added) query.added = { $gt: query.added }
            
            return await Job.find(query).populate('company industry profession');
        },
        allIndustries: async () => {
            return await Industry.find({})
                .populate('jobCount')
                .populate({
                    path: 'professions',
                    populate: { path: 'jobCount' }
                });
        },
        allProfessions: async () => {
            return await Profession.find({}).populate('industry jobCount');
        }
    },
    Mutation: {
        createJob: async (_, args, context) => {
            if (!context.user) throw new Error('UNAUTHORISED');
            const errors = validator.job(args);
            if (Object.keys(errors).length > 0) return { __typename: 'InvalidJobInput', message: 'Invalid input', errors: errors }

            const job = await Job.create(args)
            return job.populate('company industry profession')
        },
        updateJob: async (_, args, context) => {
            if (!context.user) throw new Error('UNAUTHORISED');
            const errors = validator.job(args);
            if (Object.keys(errors).length > 0) return { __typename: 'InvalidJobInput', message: 'Invalid input', errors: errors }

            const { id, title, headliner, summary, description, city, suburb, industry, profession, workType } = args;
            return await Job.findByIdAndUpdate(id, {
                title: title,
                headliner: headliner,
                summary: summary,
                description: description,
                city: city,
                suburb: suburb,
                industry: industry,
                profession: profession,
                workType: workType
            }, { new: true }).populate('company industry profession');
        },
        closeJob: async (_, { id }, context) => {
            if (!context.user) throw new Error('UNAUTHORISED');
            const closedJob = await Job.findByIdAndUpdate(id, { closing: Date.now() }, { new: true });
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
