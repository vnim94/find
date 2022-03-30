const Review = require('../../src/review/review.model');
const Rating = require('../../src/review/rating.model');

const database = require('../../util/memoryDatabase');
const User = require('../../src/user/user.model');
const Company = require('../../src/company/company.model');

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

describe('rating model', () => {
    test('averageRating virtual', () => {
        const rating = new Rating({
            review: review._id,
            benefits: 5.0,
            career: 5.0,
            balance: 5.0,
            environment: 5.0,
            management: 5.0,
            diversity: 5.0
        })

        expect(rating.averageRating).toBeTruthy();
        expect(rating.averageRating).toBe(5.0);
    })
})


