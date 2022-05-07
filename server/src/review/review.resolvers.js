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

            return await Review.findByIdAndUpdate(args.id, args, { new: true });
        },
        deleteReview: async (_, { id }, context) => {
            if (!context.user) throw new Error('UNAUTHORISED');
            return await Review.findByIdAndDelete(id); 
        }
    }
}

module.exports = ReviewResolvers;