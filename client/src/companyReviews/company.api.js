import { request } from '../profile/user.api';

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