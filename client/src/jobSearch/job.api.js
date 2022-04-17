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
            industry {
                name
                code
            }
            profession {
                name
                code
            }
            workType
            added
        }
    }
`

export const getJobs = async () => {
    return await request(getJobsRequest());
}