const Review = require('./review.model');
const validator = require('../middleware/validator');

const ReviewResolvers = {
    ReviewResult: {
        __resolveType: (_) => {
            if (!_.__typename) return 'Review';
            if (_.__typename === 'NotFound') return 'NotFound';
            if (_.__typename === 'InvalidReviewInput') return 'InvalidReviewInput';
        }
    },
    Query: {
        review: async (_, { id }) => {
            const review = await Review.findById(id).populate('company');
            if (!review) return { __typename: 'NotFound', message: 'Review not found', id: id }
            return review;
        },
        reviews: async () => {
            return await Review.find({});
        }
    },
    Mutation: {
        createReview: async (_, args, context) => {
            if (!context.user) throw new Error('UNAUTHORISED');

            const errors = validator.review(args);
            if (Object.keys(errors).length > 0) return { __typename: 'InvalidReviewInput', message: 'Invalid input', errors: errors }
            
            const review = await Review.create(args);
            return review.populate('company');
        },
        updateReview: async (_, args, context) => {
            if (!context.user) throw new Error('UNAUTHORISED');

            const errors = validator.review(args);
            if (Object.keys(errors).length > 0) return { __typename: 'InvalidReviewInput', message: 'Invalid input', errors: errors }

            const { id, title, benefits, career, balance, environment, management, diversity, good, bad, role, location, recommend, salary } = args;
            return await Review.findByIdAndUpdate(id, {
                title: title,
                benefits: benefits,
                career: career,
                balance: balance,
                environment: environment,
                management: management,
                diversity: diversity,
                good: good,
                bad: bad,
                role: role,
                location: location,
                recommend: recommend,
                salary: salary
            }, { new: true })
        },
        deleteReview: async (_, { id }, context) => {

        }
    }
}

module.exports = ReviewResolvers;