const ReviewTypes = `
    type Review {
        id: ID!
        title: String!
        user: User!
        company: Company!
        ratings: Rating!
        averageRating: Float!
        good: String!
        bad: String!
        date: Date!
        role: String!
        location: String!
        recommend: Boolean!
        salary: String!
        helpful: Int!
        flagged: Boolean!
    }

    type Rating {
        benefits: Float!
        career: Float!
        balance: Float!
        environment: Float!
        management: Float!
        diversity: Float!
    }

    input RatingInput {
        benefits: Float!
        career: Float!
        balance: Float!
        environment: Float!
        management: Float!
        diversity: Float!
    }

    type ReviewInputErrors {
        title: String
        good: String
        bad: String
        role: String
        location: String
    }

    type InvalidReviewInput implements Error {
        message: String!
        errors: ReviewInputErrors!
    }

    union ReviewResult = Review | NotFound | InvalidReviewInput

    type Query {
        review(id: ID!): ReviewResult!
        reviews(company: ID): [Review]!
    }

    type Mutation {
        createReview(
            title: String!, 
            user: ID!, 
            company: ID!,
            ratings: RatingInput!, 
            good: String!, 
            bad: String!, 
            role: String!, 
            location: ID!, 
            recommend: Boolean!,
            salary: String!
        ): ReviewResult
        updateReview(
            id: ID!, 
            title: String, 
            ratings: RatingInput,
            good: String, 
            bad: String, 
            role: String, 
            location: ID, 
            recommend: Boolean, 
            salary: String
        ): ReviewResult
        deleteReview(id: ID!): ReviewResult
    }
`

module.exports = ReviewTypes;