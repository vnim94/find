const { typeDefs, resolvers } = require('../../src/api/schema');
const EasyGraphQLTester = require('easygraphql-tester');
const tester = new EasyGraphQLTester(typeDefs, resolvers);

const database = require('../../util/memoryDatabase');
const User = require('../../src/user/user.model');
const Company = require('../../src/company/company.model');
const Review = require('../../src/review/review.model');

let context;
let user;
let company;
let review;

beforeAll(async () => {
    await database.connect();
    await database.seed();
    user = await User.findOne();
    company = await Company.findOne();
    review = await Review.findOne();
    context = { user: user._id.toString() };
});

afterAll(async () => { await database.disconnect() });

describe('review model', () => {

    test('average rating virtual', async () => {
        expect(review.rating).toBeTruthy();
        expect(review.rating).toBe(5.0);
    })

})

describe('review queries', () => {

    test('review', async () => {
        const reviewQuery = `
            {
                review(id: "${review._id.toString()}") {
                    ... on Review {
                        title
                        company {
                            name
                        }
                        rating 
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
        expect(result.data.review.rating).toBe(5.0)
    })

    test('reviews', async () => {
        const reviewsQuery = `
            {
                reviews(company: "${company._id}") {
                    title
                    rating
                    good
                    bad
                    role
                    date
                    location
                    recommend
                }
            }
        `
        const result = await tester.graphql(reviewsQuery, {}, {}, {});
        expect(result.data.reviews.length).toBe(1);
        expect(result.data.reviews[0].title).toBe('Great place to work');
        expect(result.data.reviews[0].rating).toBe(5.0)
    })
})

describe('review mutations', () => {
    test('createReview', async () => {
        const createReview = `
            mutation {
                createReview(
                    title: "Pretty good", 
                    user: "${user._id.toString()}", 
                    company: "${company._id.toString()}",
                    benefits: 5.0,
                    career: 5.0,
                    balance: 5.0,
                    environment: 5.0,
                    management: 5.0,
                    diversity: 5.0, 
                    good: "good work/life balance", 
                    bad: "short staffed", 
                    role: "Customer Service", 
                    location: "Victoria", 
                    recommend: true,
                    salary: "Average"
                ) {
                    ... on Review {
                        title
                        company {
                            name
                        }
                        rating 
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
        expect(result.data.createReview.rating).toBe(5.0);

        const newReview = await Review.findOne({ title: 'Pretty good' });
        expect(newReview.title).toBeTruthy();
    })

    test('updateReview', async () => {
        const updateReview = `
            mutation {
                updateReview(
                    id: "${review._id.toString()}"
                    title: "Not bad",
                    benefits: 4.0,
                    career: 4.0,
                    balance: 4.0,
                    environment: 4.0,
                    management: 4.0,
                    diversity: 4.0, 
                    good: "good pay", 
                    bad: "poor work/life balance", 
                    role: "Executive", 
                    location: "New South Wales", 
                    recommend: false,
                    salary: "High"
                ) {
                    ... on Review {
                        title
                        rating
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
        const result = await tester.graphql(updateReview, {}, context, {});
        expect(result.data.updateReview.title).toBe('Not bad');
        expect(result.data.updateReview.rating).toBe(4.0);

        const updatedReview = await Review.findById(review._id);
        expect(updatedReview.title).toBe('Not bad');
    })

    test('deleteReview', async () => {

    })
})


