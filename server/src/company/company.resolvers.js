const Company = require('./company.model');
const validate = require('../middleware/validator');

const CompanyResolvers = {
    CompanyResult: {
        __resolveType: (_) => {
            if (_.__typename === 'NotFound') return 'NotFound';
            if (_.__typename === 'InvalidCompanyInput') return 'InvalidCompanyInput';
            if (_.__typename === 'CompanyExists') return 'CompanyExists';
            if (!_.__typename) return 'Company';
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
            if (Object.keys(errors).length > 0) return { __typename: 'InvalidCompanyInput', message: 'Invalid input', errors: errors }
            
            if (await Company.findOne({ name: args.name })) return { 
                __typename: 'CompanyExists', 
                message: 'Company already exists', 
                name: args.name 
            }
            
            return await Company.create(args);
        },
        updateCompany: async (_, args, context) => {
            if (!context.user) throw new Error('UNAUTHORIZED');
            const errors = validate.company(args);
            if (Object.keys(errors).length > 0) return { __typename: 'InvalidCompanyInput', message: 'Invalid input', errors: errors }

            if (await Company.findOne({ name: args.name })) return { 
                __typename: 'CompanyExists', 
                message: 'Company already exists', 
                name: args.name 
            }

            const { id, name, headquarters, overview, size } = args;
            return await Company.findByIdAndUpdate(id, {
                name: name,
                headquarters: headquarters,
                overview: overview,
                size: size
            }, { new: true });
        },
        deleteCompany: async (_, args, context) => {
            if (!context.user) throw new Error('UNAUTHORIZED');
            return await Company.findByIdAndDelete(args.id);
        }
    }
}

module.exports = CompanyResolvers;