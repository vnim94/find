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
        reviews: async (_, { company }) => {
            return await Review.find({ company });
        },
        reviewsSummary: async (_, { company }) => {
            let companyId = new mongoose.Types.ObjectId(company);
            const summary = await Review.aggregate([{
                $facet: {
                    'rating': [
                        { $match: { company: companyId } },
                        { $group: { _id: '$company', averageRating: { $avg: '$averageRating' } } }
                    ],
                    'count': [
                        { $match: { company: companyId } },
                        { $group: { _id: '$company', total: { $count: {} } } }
                    ],
                    'ratingsCount': [
                        { $match: { company: companyId } },
                        { $project: { averageRating: { $round: ['$averageRating', 0] }  } },
                        { $group: { _id: '$averageRating', count: { $count: {} } } }
                    ],
                    'salary': [
                        { $match: { company: companyId, salary: { $in: ['High', 'Average'] } } },
                        { $group: { _id: '$company', count: { $count: {} } } }
                    ],
                    'recommend': [
                        { $match: { company: companyId, recommend: true } },
                        { $group: { _id: '$company', count: { $count: {} } } }
                    ]
                }
            }])

            let ratingsCount = { one: 0, two: 0, three: 0, four: 0, five: 0 };
            summary[0].ratingsCount.forEach(rating => {
                if (rating._id === 1) ratingsCount.one = rating.count;
                if (rating._id === 2) ratingsCount.two = rating.count;
                if (rating._id === 3) ratingsCount.three = rating.count;
                if (rating._id === 4) ratingsCount.four = rating.count;
                if (rating._id === 5) ratingsCount.five = rating.count;
            })
            
            return { 
                averageRating: Math.round(summary[0].rating[0].averageRating * 10) / 10,
                totalCount: summary[0].count[0].total,
                ratingsCount,
                salary: Math.round((summary[0].salary[0].count / summary[0].count[0].total) * 100) / 100,
                recommend: summary[0].recommend.length > 0 ? Math.round((summary[0].recommend[0].count / summary[0].count[0].total) * 100) / 100 : 0
            }
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
                { $group: { _id: '$company' , averageRating: { $avg: '$averageRating' } , totalCount: { $count: {} } } }
            ])
            if (reviews.length > 0) await Company.findByIdAndUpdate(args.company, { 
                reviews: {
                    averageRating: reviews[0].averageRating,
                    totalCount: reviews[0].totalCount 
                }
            });

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
                { $group: { _id: '$company' , averageRating: { $avg: '$averageRating' }, totalCount: { $count: {} } } }
            ])
            if (reviews.length > 0) await Company.findByIdAndUpdate(review.company, { 
                reviews: {
                    averageRating: reviews[0].averageRating,
                    totalCount: reviews[0].totalCount 
                }
            });

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