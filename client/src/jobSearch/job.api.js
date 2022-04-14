import { request } from '../profile/user.api';

const getJobsRequest = () => `
    {
        jobs {
            id
            title
            headliner
            summary
            description
            company {
                name
            }
            city
            suburb
            industry
            profession
            workType
            added
        }
    }
`

export const getJobs = async () => {
    return await request(getJobsRequest());
}