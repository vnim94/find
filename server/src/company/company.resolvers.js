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
            const company = await Company.findById(id).populate('industry');
            if (!company) return { __typename: 'NotFound', message: 'Company not found', id: id }
            
            return company
        },
        companies: async () => {
            return await Company.find({}).populate('industry');
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
            
            const company = await Company.create(args);
            return company.populate('industry');
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

            const { id, name, industry, headquarters, overview, size } = args;
            const company = await Company.findByIdAndUpdate(id, {
                name: name,
                industry: industry,
                headquarters: headquarters,
                overview: overview,
                size: size
            }, { new: true });

            return company.populate('industry');
        },
        deleteCompany: async (_, args, context) => {
            if (!context.user) throw new Error('UNAUTHORIZED');
            return await Company.findByIdAndDelete(args.id);
        }
    }
}

module.exports = CompanyResolvers;