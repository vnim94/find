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

const getCompanyReviewsRequest = (id, page, sortByDate) => `
    {
        companyReviews(company: "${id}", page: ${page}, sortByDate: ${sortByDate}) {
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
                date
                role
                location
                recommend
                salary
                helpful
                flagged
            }
            totalReviews
        }
    }
`

const getCompanyReviewsSummaryRequest = (id) => `
    {
        reviewsSummary(company: "${id}") {
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

export const getCompanyReviews = async (id, page, sortByDate) => {
    return await request(getCompanyReviewsRequest(id, page, sortByDate));
}