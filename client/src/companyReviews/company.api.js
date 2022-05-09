import { request } from '../profile/user.api';

const getCompanyRequest = (id) => `
    {
        company(id: "${id}") {
            ... on Company {
                id
                name
                website
                industry {
                    name
                }
                specialities
                headquarters
                overview
                mission
                culture {
                    image
                    keyMessage {
                        heading
                        text
                    }
                    values {
                        heading
                        text
                    }
                    perks {
                        heading
                        text
                    }
                    diversity
                }
                reviews {
                    averageRating
                    totalCount
                }
                size
                logo
            }
        }
    }
`

const getCompanyReviewsRequest = (id) => `
    {
        reviews(company: "${id}") {
            ... on Review {
                title
                user
                ratings {
                    benefits
                    career
                    balance
                    environment
                    management
                    diversity
                }
                averageRating
                good
                bad
                date
                role
                location
                recommend
                salary
                helpful
                flagged
            }
        }
    }
`

const getCompanyReviewsSummaryRequest = (id) => `
    {
        reviewsSummary(company: "${id}") {
            averageRating
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

const getCompaniesRequest = `
    {
        companies {
            id
            name
            website
            industry {
                name
            }
            specialities
            headquarters
            overview
            reviews {
                averageRating
                totalCount
            }
            size
            logo
        }
    }
`

export const getCompanies = async () => {
    return await request(getCompaniesRequest);
}

export const getCompany = async (id) => {
    return await request(getCompanyRequest(id));
}

export const getCompanyReviewSummary = async (id) => {
    return await request(getCompanyReviewsSummaryRequest(id));
}