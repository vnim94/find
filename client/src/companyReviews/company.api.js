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
                averageRating
                size
                logo
            }
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
            averageRating
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