const { typeDefs, resolvers } = require('../../src/api/schema');
const EasyGraphQLTester = require('easygraphql-tester');
const tester = new EasyGraphQLTester(typeDefs, resolvers);

const database = require('../../util/memoryDatabase');
const User = require('../../src/user/user.model');
const Company = require('../../src/company/company.model');
const Location = require('../../src/job/location.model');
const Review = require('../../src/review/review.model');

let context;
let user;
let company;
let review;

beforeAll(async () => {
    await database.connect();
    await database.seed();
    user = await User.findOne();
    company = await Company.findOne({ name: 'McDonalds' });
    review = await Review.findOne();
    location = await Location.findOne({ city: 'Melbourne' });
    context = { user: user._id.toString() };
});

afterAll(async () => { await database.disconnect() });

describe('review model', () => {
    test('average rating', async () => {
        expect(review.ratings.average).toBeTruthy();
        expect(review.ratings.average).toBe(5.0);
    })
})

describe('review queries', () => {
    test('review', async () => {
        const reviewQuery = `
            {
                review(id: "${review._id}") {
                    ... on Review {
                        title
                        company
                        ratings {
                            average
                            benefits
                            career
                            balance
                            environment
                            management
                            diversity
                        }
                        good
                        bad
                        role
                        date
                        location
                        recommend
                    }
                }
            }
        `
        const result = await tester.graphql(reviewQuery, {}, {}, {});
        expect(result.data.review.title).toBe('Great place to work')
        expect(result.data.review.ratings.average).toBe(5.0)
    })

    test('reviews', async () => {
        const reviewsQuery = `
            {
                companyReviews(company: "${company._id}") {
                    reviews {
                        title
                        ratings {
                            average
                            benefits
                            career
                            balance
                            environment
                            management
                            diversity
                        }
                        good
                        bad
                        role
                        date
                        location
                        recommend
                    }
                    totalReviews
                }
            }
        `
        const result = await tester.graphql(reviewsQuery, {}, {}, {});
        expect(result.data.companyReviews.totalReviews).toBe(1);
        expect(result.data.companyReviews.reviews[0].title).toBe('Great place to work');
        expect(result.data.companyReviews.reviews[0].ratings.average).toBe(5.0)
    })

    test('reviewsSummary', async () => {
        const reviewsSummaryQuery = `
            {
                reviewsSummary(company: "${company._id}") {
                    ratings {
                        average
                        benefits
                        career
                        balance
                        environment
                        management
                        diversity
                    }
                    totalCount
                    ratingsCount {
                        one
                        two
                        three
                        four
                        five
                    }
                    salary
                    recommend
                }
            }
        `
        const result = await tester.graphql(reviewsSummaryQuery, {}, {}, {});
        
        expect(result.data.reviewsSummary.ratings).toBeTruthy();
        expect(result.data.reviewsSummary.totalCount).toBe(1);
        expect(result.data.reviewsSummary.ratingsCount.five).toBe(1);
        expect(result.data.reviewsSummary.salary).toBe(1);
        expect(result.data.reviewsSummary.recommend).toBe(1);
    })
})

describe('review mutations', () => {
    test('createReview', async () => {
        const createReview = `
            mutation {
                createReview(
                    title: "Pretty good", 
                    user: "${user._id}", 
                    company: "${company._id}",
                    ratings: {
                        benefits: 4.0,
                        career: 4.0,
                        balance: 4.0,
                        environment: 4.0,
                        management: 4.0,
                        diversity: 4.0
                    },
                    good: "good work/life balance", 
                    bad: "short staffed", 
                    role: "Customer Service", 
                    location: "${location._id}", 
                    recommend: true,
                    salary: "Average"
                ) {
                    ... on Review {
                        title
                        company
                        ratings {
                            average
                        } 
                        good
                        bad
                        date
                        role
                        location
                        recommend
                        helpful
                        flagged
                    }
                }
            }
        `
        const result = await tester.graphql(createReview, {}, context, {});
        expect(result.data.createReview.title).toBe('Pretty good');
        expect(result.data.createReview.ratings.average).toBe(4.0);
        
        const newReview = await Review.findOne({ title: 'Pretty good' });
        expect(newReview.title).toBeTruthy();

        const updatedCompany = await Company.findOne({ name: 'McDonalds' });
        expect(updatedCompany.reviews.averageRating).toBe(4.5)
        expect(updatedCompany.reviews.totalCount).toBe(2)
    })

    test('updateReview', async () => {
        const updateReview = `
            mutation {
                updateReview(
                    id: "${review._id}"
                    title: "Not bad",
                    ratings: {
                        benefits: 4.0,
                        career: 4.0,
                        balance: 4.0,
                        environment: 4.0,
                        management: 4.0,
                        diversity: 4.0
                    },
                    good: "good pay", 
                    bad: "poor work/life balance", 
                    location: "${location._id}",
                    role: "Executive", 
                    recommend: false,
                    salary: "High"
                ) {
                    ... on Review {
                        title
                        ratings {
                            average
                            benefits
                            career
                            balance
                            environment
                            management
                            diversity
                        }
                        good
                        bad
                        role
                        location
                        recommend
                        salary
                    }
                }
            }
        `
        await tester.graphql(updateReview, {}, context, {});
        const updatedReview = await Review.findById(review._id);
        expect(updatedReview.title).toBe('Not bad');
        expect(updatedReview.ratings.average).toBe(4);

        const updatedCompany = await Company.findOne({ name: 'McDonalds' });
        expect(updatedCompany.reviews.averageRating).toBe(4);
        expect(updatedCompany.reviews.totalCount).toBe(2)
    })

    test('deleteReview', async () => {
        const deleteReview = `
            mutation {
                deleteReview(id: "${review._id.toString()}") {
                    ... on Review {
                        id
                    }
                }
            }
        `
        const result = await tester.graphql(deleteReview, {}, context, {});
        expect(result.data.deleteReview.id).toBeTruthy();

        const deletedReview = await Review.findById(review._id.toString());
        expect(deletedReview).toBeFalsy();
    })
})


