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
            const review = await Review.findById(id);
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
                    'ratings': [
                        { $match: { company: companyId } },
                        { 
                            $group: { 
                                _id: '$company', 
                                average: { $avg: '$ratings.average' },
                                benefits: { $avg: '$ratings.benefits' }, 
                                career: { $avg: '$ratings.career' },
                                balance: { $avg: '$ratings.balance' },
                                environment: { $avg: '$ratings.environment' },
                                management: { $avg: '$ratings.management' },
                                diversity: { $avg: '$ratings.diversity' }
                            } 
                        }
                    ],
                    'count': [
                        { $match: { company: companyId } },
                        { $group: { _id: '$company', total: { $count: {} } } }
                    ],
                    'ratingsCount': [
                        { $match: { company: companyId } },
                        { $project: { averageRating: { $round: ['$ratings.average', 0] }  } },
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

            const { ratings, count, ratingsCount, salary, recommend } = summary[0]

            const { average, benefits, career, balance, environment, management, diversity } = ratings[0];
            const allRatings = { average, benefits, career, balance, environment, management, diversity };

            const allRatingsCount = { one: 0, two: 0, three: 0, four: 0, five: 0 };
            ratingsCount.forEach(rating => {
                if (rating._id === 1) allRatingsCount.one = rating.count;
                if (rating._id === 2) allRatingsCount.two = rating.count;
                if (rating._id === 3) allRatingsCount.three = rating.count;
                if (rating._id === 4) allRatingsCount.four = rating.count;
                if (rating._id === 5) allRatingsCount.five = rating.count;
            })
            
            return { 
                ratings: allRatings,
                totalCount: count[0].total,
                ratingsCount: allRatingsCount,
                salary: salary[0].count / count[0].total,
                recommend: recommend.length > 0 ? recommend[0].count / count[0].total : 0
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
                { $group: { _id: '$company' , averageRating: { $avg: '$ratings.average' } , totalCount: { $count: {} } } }
            ])
            if (reviews.length > 0) await Company.findByIdAndUpdate(args.company, { 
                reviews: {
                    averageRating: reviews[0].averageRating,
                    totalCount: reviews[0].totalCount 
                }
            });

            return review;
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
                { $group: { _id: '$company' , averageRating: { $avg: '$ratings.average' }, totalCount: { $count: {} } } }
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
    return (benefits + career + balance + environment + management + diversity) / 6;
}

module.exports = ReviewResolvers;