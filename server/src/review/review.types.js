const ReviewTypes = `
    type Review {
        title: String!
        user: User!
        company: Company!
        rating: Float!
        good: String!
        bad: String!
        date: Date!
        role: String!
        location: String!
        recommend: Boolean!
        helpful: Boolean
        flagged: Boolean!
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
        createReview(title: String!, user: ID!, company: ID!, rating: Float!, good: String!, bad: String!, role: String!, location: String!, recommend: Boolean): ReviewResult
        updateReview(id: ID!, title: String, rating: Float, good: String, bad: String, role: String, location: String, recommend: Boolean): ReviewResult
        deleteReview(id: ID!): Review
    }
`

module.exports = ReviewTypes;