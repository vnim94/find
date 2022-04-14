import { request } from '../profile/user.api';

const getCompaniesRequest = `
    {
        companies {
            id
            name
            headquarters
            overview
            averageRating
            size
        }
    }
`

export const getCompanies = async () => {
    return await request(getCompaniesRequest);
}