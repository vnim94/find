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
        getJob: async (_, { id }) => {
            const job = await Job.findById(id).populate('company');
            if (!job) return { __typename: 'NotFound', message: 'Job not found', id: id }
            return job
        },
        getJobs: async (_, query) => {
            
            let { sortByDate, page, limit, title, industry, location, profession, workType, payBase, payCeiling, added } = query
            
            if (title) query.title = { $regex: title, $options: 'i' }
            if (location) query.location = { $in: location }
            if (industry) query.industry = { $in: industry }
            if (profession) query.profession = { $in: profession }
            if (workType) query.workType = { $in: workType }
            if (payBase) query.payBase = { $gte: payBase }
            if (payCeiling) query.payCeiling = { $lte: payCeiling }
            if (added) query.added = { $gt: added }
            
            const jobs = await Job.find(query)
                .populate('location company industry profession')
                .sort(sortByDate ? { added: 'desc' } : undefined)
                .limit(limit)
                .skip((page - 1) * limit)
            const totalJobs = await Job.find(query).countDocuments()
        
            return { jobs, totalJobs }
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
        },
        allLocations: async () => {
            return await Location.find({});
        }
    },
    Mutation: {
        createJob: async (_, args, context) => {
            if (!context.user) throw new Error('UNAUTHORISED');
            const errors = validator.job(args);
            if (Object.keys(errors).length > 0) return { __typename: 'InvalidJobInput', message: 'Invalid input', errors: errors }

            const job = await Job.create(args)
            return job.populate('location company industry profession')
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
            }, { new: true }).populate('location company industry profession');
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
