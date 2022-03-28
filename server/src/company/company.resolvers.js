const Company = require('./company.model');
const validate = require('../middleware/validator');

const CompanyResolvers = {
    CompanyResult: {
        __resolveType: (_) => {
            if (_.__typename === 'Company') return 'Company';
            if (_.__typename === 'NotFound') return 'NotFound';
            if (_.__typename === 'CompanyExists') return 'CompanyExists';
            return null;
        }
    },
    Query: {
        company: async (_, { id }) => {
            const company = await Company.findById(id);
            if (!company) return { __typename: 'NotFound', message: 'Company not found', id: id }
            return company
        },
        companies: async () => {
            return await Company.find({});
        }
    },
    Mutation: {
        createCompany: async (_, args, context) => {
            if (!context.user) throw new Error('UNAUTHORIZED');
            const errors = validate.company(args);
            if (errors) return { __typename: 'InvalidInput', message: 'Invalid input', errors: errors }

            if (await Company.findOne({ name: args.name })) return { __typename: 'CompanyExists', message: 'Company already exists', name: args.name }

            return await Company.create(args);
        },
        updateCompany: async (_, args, context) => {
            if (!context.user) throw new Error('UNAUTHORIZED');
        },
        deleteCompany: async (_, args, context) => {
            if (!context.user) throw new Error('UNAUTHORIZED');
        }
    }
}

module.exports = CompanyResolvers;