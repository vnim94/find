const Review = require('./review.model');
const Company = require('../company/company.model');
const validator = require('../middleware/validator');
const mongoose = require('mongoose');

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
            const reviews = await Review.aggregate([
                { $match: { company: new mongoose.Types.ObjectId(args.company) } },
                { $group: { _id: '$company' , averageRating: { $avg: '$averageRating' } } }
            ])
            if (reviews.length > 0) await Company.findByIdAndUpdate(args.company, { averageRating: reviews[0].averageRating });

            return review.populate('company');
        },
        updateReview: async (_, args, context) => {
            if (!context.user) throw new Error('UNAUTHORISED');

            const errors = validator.review(args);
            if (Object.keys(errors).length > 0) return { __typename: 'InvalidReviewInput', message: 'Invalid input', errors: errors }

            const review = await Review.findById(args.id);
            review.set({ ...args, averageRating: calculateAverageRating(args.ratings) })
            await review.save();

            const reviews = await Review.aggregate([
                { $match: { company: review.company } },
                { $group: { _id: '$company' , averageRating: { $avg: '$averageRating' } } }
            ])
            if (reviews.length > 0) await Company.findByIdAndUpdate(review.company, { averageRating: reviews[0].averageRating });

            return review.populate('company');
        },
        deleteReview: async (_, { id }, context) => {
            if (!context.user) throw new Error('UNAUTHORISED');
            return await Review.findByIdAndDelete(id); 
        }
    }
}

function calculateAverageRating(ratings) {
    const { benefits, career, balance, environment, management, diversity } = ratings;
    let averageRating = (benefits + career + balance + environment + management + diversity) / 6;
    return Math.round(averageRating * 10) / 10;
}

module.exports = ReviewResolvers;