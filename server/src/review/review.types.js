const ReviewTypes = `
    type Review {
        title: String!
        user: User!
        company: Company!
        rating: Float!
        benefits: Float!
        career: Float!
        balance: Float!
        environment: Float!
        management: Float!
        diversity: Float!
        good: String!
        bad: String!
        date: Date!
        role: String!
        location: String!
        recommend: Boolean!
        salary: String!
        helpful: Boolean
        flagged: Boolean
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
            benefits: Float!, 
            career: Float!,
            balance: Float!,
            environment: Float!,
            management: Float!,
            diversity: Float!,
            good: String!, 
            bad: String!, 
            role: String!, 
            location: String!, 
            recommend: Boolean!,
            salary: String!
        ): ReviewResult
        updateReview(
            id: ID!, 
            title: String, 
            benefits: Float!, 
            career: Float!,
            balance: Float!,
            environment: Float!,
            management: Float!,
            diversity: Float!, 
            good: String, 
            bad: String, 
            role: String, 
            location: String, 
            recommend: Boolean, 
            salary: String
        ): ReviewResult
        deleteReview(id: ID!): Review
    }
`

module.exports = ReviewTypes;